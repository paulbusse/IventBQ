<template>
  <div>
    <h1>Goederen toevoegen</h1>
    <div class='p-grid itemadd'>
      <div class='p-col-4 field'>
        <label for="idDescription">Omschrijving</label>
        <span class="p-input-icon-right">
          <i class="pi pi-times clickable" @click='emptyDescription'/>
          <InputText
           id="idDescription"
           v-model="description"
           type="text"
           aria-describedby="description-help"
           ref='refDescription'
          />
        </span>
        <small id="description-help" class="p-error">{{descriptionerr}}&nbsp;</small>
      </div>
      <div class='p-col-4 field'>
        <label for="idQuantity">Hoeveelheid</label>
        <span class="p-input-icon-right">
          <i class="pi pi-times clickable" @click='emptyQuantity'/>
          <InputText
           id="idQuantity"
           v-model="quantity"
           type="text"
           aria-describedby="quantity-help"
           ref='refQuantity'
          />
        </span>
        <small id="quantity-help" class="p-error">&nbsp;</small>
      </div>
      <div class='p-col-2 number'>
        <label for="idCount">Aantal</label>
        <InputNumber id='idCount'
          showButtons buttonLayout="horizontal"
          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
          decrementButtonClass="p-button-outlined" incrementButtonClass="p-button-outlined"
          :min='1' v-model="count" aria-describedby="count-help"/>
        <small id="count-help" class="p-error">&nbsp;</small>
      </div>
      <div class='p-col-2 place'>
        <label for="place">Plaats</label>
        <Dropdown id='place' v-model="place" :options='places.places' optionLabel='label'/>
      </div>

      <div class='p-grid'>
        <div class='p-col-12 buttons'>
          <Button label="Voeg toe" icon="pi pi-plus" @click="addItem"
          class='p-button-outlined' :disabled='description.length === 0' autofocus />&nbsp;
          <Button label='Wijzig' icon="pi pi-save" @click="saveItem"
            class='p-button-outlined' :disabled='selected.length === 0' autofocus/>
        </div>
      </div>
    </div>

    <hr>
    <h1>Laatst toegevoegde goederen</h1>
    <div class='itemlist'>
      <Button label='Bewaar' icon="pi pi-save" @click="saveList"
            class='p-button-outlined' :disabled='edited == 0' autofocus/>
      <ul ref='refList' :style='{"max-height": listHeight}'>
        <li v-for="item in items" class='item'
          :class="{selected : selected == item.key}"
        :key='item.key'>
          <span class="icon" @click="deleteItem(item.key)">&#xe90b;</span>
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
  ref, reactive, watch, onMounted,
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
    const selected = ref('');
    const edited = ref(state.modifiedCreateItems);

    const refDescription = ref(null);
    const refQuantity = ref(null);
    const refList = ref([]);
    const listHeight = ref('calc(100vh - 500px)');

    // const tempitems = new Items();
    const items = ref(state.createItems);
    const places = reactive(state.places);

    onMounted(() => {
      let { top } = refList.value.getBoundingClientRect();
      top += 8; // add a margin to the viewport
      listHeight.value = `calc(100vh - ${top}px)`;
    });

    watch(description,
      (cur) => {
        console.log('watch description', cur);
        if (cur.length === 0) descriptionerr.value = 'Omschrijving mag niet leeg zijn.';
        else descriptionerr.value = '';
      });

    if (places.length === 0) {
      const np = [];
      svcPlaces.getAllPlaces(np);
      places.set(np);
    }

    if (items.value.length > 0) {
      console.log(items.value[0]);
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

      selected.value = '';
      edited.value = 1;
    }

    function deleteItem(key) {
      items.value.delete(key);
      edited.value = 1;
    }

    function itemClick(item) {
      selected.value = item.key;

      description.value = item.description;
      quantity.value = item.quantity;
      count.value = item.count;
      place.value = item.place;
      console.log(item);
    }

    function saveItem() {
      console.log(place.value);
      items.value.set(selected.value, {
        description: description.value,
        quantity: quantity.value,
        count: count.value,
        place: place.value,
      });

      selected.value = '';
      edited.value = 1;
    }

    function getLIClass(item) {
      let liClass = item.class;
      if (selected.value === item.key) liClass += ' selected';
      return liClass;
    }

    function emptyDescription() {
      console.log('emptyDescription');
      description.value = '';
      refDescription.value.$el.focus();
    }

    function emptyQuantity() {
      console.log('emptyQuantity');
      quantity.value = '';
      refQuantity.value.$el.focus();
    }

    function saveList() {
      items.value.backendSync();
    }

    return {
      // Input fields
      description,
      descriptionerr,
      quantity,
      place,
      count,
      emptyDescription,
      emptyQuantity,

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
      refDescription,
      refQuantity,
      getLIClass,
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

  .clickable:hover {
    cursor: pointer;
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
      font-family: 'primeicons';
      margin-right: 1em;
      color: var(--primary-color);
    }

    .icon:hover {
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
      font-weight: bold;
      color:var(--primary-color);
    }
  }
}

</style>
