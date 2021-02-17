<template>
  <Card class="iic-view">
    <template #title>
      <h1>Goederen toevoegen</h1>
    </template>

    <template #content>
      <div class='p-grid'>
        <div class='p-col-4 description'>
          <div class='p-input-icon-right'>
            <label for="description">Omschrijving</label>
            <i class='pi pi-times' @click="emptyDescription"/>
            <InputText ref='trDescription' id='description' type="text" v-model="description"/>
            <small class="p-invalid" id="placename-help">{{descriptionerr}}&nbsp;</small>
          </div>
        </div>
        <div class='p-col-4 quantity'>
          <div class='p-input-icon-right'>
            <label for="quantity">Hoeveelheid</label>
            <i class='pi pi-times' @click='emptyQuantity'/>
            <InputText ref='trQuantity' id='quantity' type="text" v-model="quantity"/>
            <small class="p-invalid" id="placename-help">&nbsp;</small>
          </div>
        </div>
        <div class='p-col-2 count'>
          <label for="count">Aantal</label>
          <InputNumber id='count'
            showButtons buttonLayout="horizontal"
            incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
            decrementButtonClass="p-button-outlined" incrementButtonClass="p-button-outlined"
            :min='1' v-model="count"/>
        </div>
        <div class='p-col-2 place'>
          <label for="place">Plaats</label>
          <Dropdown id='place' v-model="place" :options='places' optionLabel='label'/>
        </div>
      </div>
      <div class='p-grid'>
        <div class='p-col-12'>
          <Button label="Voeg toe" icon="pi pi-plus" @click="addItem"
          class='p-button-outlined' autofocus />&nbsp;
          <Button label='Wijzig' icon="pi pi-save" @click="saveItem"
            class='p-button-outlined' :disabled='selected.length === 0' autofocus/>
        </div>
      </div>
      <hr>

      <ul class='itemlist'>
        <li v-for="item in items" class='item' :class="{selected : selected == item.key}"
         :key='item.key'>
          <Button icon="pi pi-times" @click="deleteItem(item.key)"
            class='p-button-rounded p-button-text p-button-sm' autofocus />
          <span class="editable" @click="itemClick(item)" :class="getLIClass(item)">
            {{item.count}} {{item.description}}
            <span v-if="item.quantity">- {{item.quantity}}</span>
            <span v-if="item.place.name"> @ {{item.place.name}}</span>
            : {{item.ids.join(', ')}}
          </span>
        </li>
      </ul>
      <p>{{selected}}</p>
      <hr>
    </template>
  </Card>
</template>

<script>
import { ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import Items from '../classes/items';
import Places from '../classes/places';
import notify from '../utils/notify';

export default {
  setup() {
    const description = ref('');
    const descriptionerr = ref('');
    const quantity = ref('');
    const place = ref('');
    const count = ref(1);
    const selected = ref('');

    const trDescription = ref(null);
    const trQuantity = ref(null);

    // const tempitems = new Items();
    const items = ref(new Items());
    const places = ref(new Places());

    notify.setToaster(useToast());

    if (items.value.length > 0) {
      description.value = items.value[0].description;
      quantity.value = items.value[0].quantity;
    }

    watch(description,
      (cur) => {
        if (cur.length === 0) descriptionerr.value = 'Omschrijving mag niet leeg zijn.';
        else descriptionerr.value = '';
      });

    function addItem() {
      if (descriptionerr.value.length !== 0) return;

      items.value.add({
        description: description.value,
        quantity: quantity.value,
        count: count.value,
        place: place.value,
      });

      selected.value = '';
    }

    function deleteItem(key) {
      items.value.delete(key);
    }

    function itemClick(item) {
      selected.value = item.key;

      description.value = item.description;
      quantity.value = item.quantity;
      count.value = item.count;
      place.value = item.place;
    }

    function saveItem() {
      items.value.set(selected.value, {
        description: description.value,
        quantity: quantity.value,
        count: count.value,
        place: place.value,
      });

      selected.value = '';
    }

    function getLIClass(item) {
      let liClass = item.class;
      if (selected.value === item.key) liClass += ' selected';
      return liClass;
    }

    function emptyDescription() {
      description.value = '';
      trDescription.value.$el.focus();
    }

    function emptyQuantity() {
      quantity.value = '';
      trQuantity.value.$el.focus();
    }

    return {
      // Input fields
      description,
      descriptionerr,
      quantity,
      place,
      count,
      trDescription,
      trQuantity,
      emptyDescription,
      emptyQuantity,

      // Items
      items,
      addItem,
      deleteItem,
      saveItem,

      // Item list
      itemClick,
      selected,
      getLIClass,

      // Places
      places,
    };
  },
};

</script>

<style lang="scss">

.iic-view {
  .header {
    box-sizing: border-box;
    border-bottom: 1px solid var(--text-color);
    font-weight: bold;
    text-align: center;
  }

  .p-card-title {
    h1 {
      font-size: 1.5rem;
      text-align:left
    }
  }

  .description {
    .p-input-icon-right {
      width:100%;

      i:hover {
        cursor: pointer;
      }
    }

    .p-inputtext {
      width: 100%;
    }
  }

  .quantity {
    .p-input-icon-right {
      width:100%;

      i:hover {
        cursor: pointer;
      }
    }

    .p-inputtext {
      width: 100%;
    }
  }
  .count {
    .p-inputtext {
      width: 40%;
    }

    .p-inputnumber-input {
      text-align: right;
    }
  }

  .place {
    .p-dropdown {
      width: 100%;
    }
  }

  .itemlist {
    padding-left: 0;

    li {
        list-style-type: none; /* Remove bullets */
        padding: 0; /* Remove padding */
        margin: 0; /* Remove margins */

        .p-button {
          padding: 0;
          height: 1.5rem;
          width:1.5rem;
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

}

</style>
