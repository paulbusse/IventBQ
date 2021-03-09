<template>
  <div>
    <h1>Goederen toevoegen</h1>
    <div class='p-grid itemadd'>
      <div class='p-col-4 field'>
        <label for="idDescription">Omschrijving</label>
        <AutoComplete
          id="idDescription"
          style='width:100%'
          v-model="description"
          :suggestions="filteredDescriptions"
          @complete="searchDescription($event)"
          @focus="focus($event)"
          aria-describedby="description-help"
        />
        <small id="description-help" class="p-error">{{descriptionerr}}&nbsp;</small>
      </div>
      <div class='p-col-4 field'>
        <label for="idQuantity">Hoeveelheid</label>
        <span class="p-input-icon-right">
          <InputText
           id="idQuantity"
           v-model="quantity"
           type="text"
           aria-describedby="quantity-help"
           @focus="focus($event)"
          />
        </span>
        <small id="quantity-help" class="p-error">&nbsp;</small>
      </div>
      <div class='p-col-2 number'>
        <label for="idCount">Aantal</label>
        <InputNumber id='idCount'
          showButtons buttonLayout="horizontal"
          incrementButtonIcon="mdi mdi-plus" decrementButtonIcon="mdi mdi-minus"
          decrementButtonClass="p-button-outlined" incrementButtonClass="p-button-outlined"
          :min='1' v-model="count" aria-describedby="count-help"/>
        <small id="count-help" class="p-error">&nbsp;</small>
      </div>
      <div class='p-col-2 place'>
        <label for="place">Plaats</label>
        <Dropdown id='place' v-model="place" :options='places.places' optionLabel='label'/>
      </div>
<div class='p-grid'>

      </div>
      <div class='p-grid'>
        <div class='p-col-12 buttons'>
          <Button label="Voeg toe" icon="mdi mdi-plus" @click="addItem"
          class='p-button-outlined' :disabled='description.length === 0' autofocus />&nbsp;
          <Button label='Wijzig' icon="mdi mdi-sync" @click="saveItem"
            class='p-button-outlined' :disabled='changeDisabled' autofocus/>
        </div>
      </div>

    </div>

    <hr>
    <h1>Laatst toegevoegde goederen</h1>
    <div class='itemlist'>
      <Button label='Bewaar' icon="mdi mdi-content-save-outline" @click="saveList"
            class='p-button-outlined' :disabled='edited == 0' autofocus/>
      <ul ref='refList' :style='{"max-height": listHeight}'>
        <li v-for="item in items" class='item'
          :class="{selected : selected !== null && selected.key === item.key}"
          :key='item.key'>
          <span class='clickable icon mdi mdi-trash-can-outline'
            v-if='item.class !== "locked" && item.class !== "error"'
             @click="deleteItem(item.key)"/>
          <span v-if='item.class === "locked"' class="icon mdi mdi-lock-outline" />
          <span v-if='item.class === "error"' class="icon mdi mdi-lock-outline" />
          <span class="editable" @click="itemClick(item)" :class="getLIClass(item)">
            {{item.count}} {{item.description}}
            <span v-if="item.quantity">- {{item.quantity}}</span>
            <span v-if="item.place.label"> @ {{item.place.label}}</span>
            : {{item.labels.join(', ')}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import {
  ref, reactive, watch, onMounted, computed,
} from 'vue';
import state from '../utils/state';
import svcPlaces from '../service/places';

export default {
  setup() {
    const description = ref('');
    const descriptionerr = ref('');
    const quantity = ref('');
    const place = ref('');
    const count = ref(1);
    const selected = ref(null);
    const edited = ref(state.modifiedCreateItems);

    const refList = ref([]);
    const listHeight = ref('calc(100vh - 500px)');

    // Autocomplete test
    const filteredDescriptions = ref([]);

    // const tempitems = new Items();
    const items = ref(state.createItems);
    const places = reactive(state.places);

    onMounted(() => {
      let { top } = refList.value.getBoundingClientRect();
      top += 8; // add a margin to the viewport
      listHeight.value = `calc(100vh - ${top}px)`;
    });

    const changeDisabled = computed(() => (selected.value === null || selected.value.class === 'locked'));

    watch(description,
      (cur) => {
        if (cur.length === 0) descriptionerr.value = 'Omschrijving mag niet leeg zijn.';
        else descriptionerr.value = '';
      });

    if (places.length === 0) {
      const np = [];
      svcPlaces.getAllPlaces(np);
      places.set(np);
    }

    if (items.value.length > 0) {
      description.value = items.value[0].description;
      quantity.value = items.value[0].quantity;
      place.value = items.value[0].place;
    }

    function addItem() {
      if (descriptionerr.value.length !== 0) return;

      items.value.add({
        description: description.value,
        quantity: quantity.value,
        count: count.value,
        place: place.value,
      });

      selected.value = null;
      edited.value = 1;
      state.itemDescriptions.add(description.value);
    }

    function deleteItem(key) {
      items.value.delete(key);
      edited.value = 1;
    }

    function itemClick(item) {
      selected.value = item;

      description.value = item.description;
      quantity.value = item.quantity;
      count.value = item.count;
      place.value = item.place;
    }

    function saveItem() {
      items.value.set(selected.value.key, {
        description: description.value,
        quantity: quantity.value,
        count: count.value,
        place: place.value,
      });

      selected.value = null;
      edited.value = 1;
      state.itemDescriptions.add(description.value);
    }

    function getLIClass(item) {
      let c = item.class;
      if (selected.value && selected.value.key === item.key) c += ' selected';
      return c;
    }

    function saveList() {
      items.value.backendSync();
      edited.value = 0;
    }

    let prevQuery = null;
    function searchDescription(event) {
      const curQuery = event.query;
      let list;
      if (curQuery.indexOf(prevQuery) === 0) list = filteredDescriptions.value;
      else list = state.itemDescriptions.descriptions;

      const newList = list.filter((str) => str.indexOf(curQuery) !== -1);
      filteredDescriptions.value = newList;

      prevQuery = curQuery;
    }

    function focus(event) {
      if (!event.relatedTarget) return;
      if (event.relatedTarget.id === event.target.id) return;
      event.target.select();
    }

    return {
      // Input fields
      description,
      descriptionerr,
      quantity,
      place,
      count,

      // Items
      items,
      addItem,
      deleteItem,
      saveItem,
      saveList,

      // Item list
      itemClick,
      selected,
      edited,

      // Places
      places,

      // Layout
      listHeight,
      refList,

      getLIClass,
      changeDisabled,

      // Autocomplete
      searchDescription,
      filteredDescriptions,
      focus,
    };
  },
};

</script>

<style lang="scss">
h1 {
  font-size: 1.5rem;
  text-align:left;
  margin-top: 0;
  margin-bottom: 16px;
}

.itemadd {
  .field * {
      display: block;

    .p-inputtext {
      width: 100%;
    }
  }

  .number {
    display: block;
    .p-inputnumber {
      width: 100%;
    }
    .p-inputnumber-input {
      width: calc(100% - 75px);
      text-align: right;
    }
  }

  .place {
    .p-dropdown {
      width: 100%;
    }
  }

  .buttons {
    margin-left: 8px;
  }
}

.itemlist {
  ul {
    box-sizing: border-box;
    overflow-y: scroll;
    padding-left: 0;
    margin-top: 8px;
  }

  li.item {
    list-style-type: none; /* Remove bullets */
    margin-bottom: 5px;
    padding {
      top: 20px;
      bottom: 3px;
    };

    .icon {
      margin-right: 1em;
      color: var(--primary-color);
    }

    .clickable:hover {
      cursor: pointer;
    }

    .p-button {
      padding: 0;
      height: 1.5rem;
      width:1.5rem;
      margin-bottom: 0;
    }

    .create {
      font-style: italic;
    }

    .editable:hover {
      text-decoration: underline solid var(--primary-color);
      cursor: pointer;
    }

    .selected {
      color:var(--primary-color);
    }
  }
}

</style>
