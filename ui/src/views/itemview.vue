<template>
  <DataTable
    :value='items.items.value'
    :loading='loads.value'
    class='p-datatable-sm'
    :filters='itemFilters.filters.value' @update:filters='itemFilters.update($event)'
    dataKey='id'
    filterDisplay='menu'
    :globalFilterFields="['description']"
    :paginator='true'
    :rows='10'
    responsiveLayout="scroll"
  >
    <template #header>
      <h1>Lijst van artikelen</h1>
    <Button label="Clear Filters" icon="pi pi-filter-slash" @click="itemFilters.reset()"
      class="p-button-outlined p-button-secondary"/>
    </template>
    <template #loading>
      Aan het laden ...
    </template>
    <Column field='labelid' header='Etiket'  :sortable='true' dataType='numeric'>
    <template #body="{data}">
            {{data.labelid}}
        </template>
        <template #filter="{filterModel}">
            <InputNumber v-model="filterModel.value" />
        </template>
    </Column>
    <Column field="description" header="Omschrijving" sortable>
      <template #body="{data}">
        {{data.description}}
      </template>
      <template #filter="{filterModel}">
          <InputText type="text" v-model="filterModel.value"
          class="p-column-filter" placeholder="Search by description"/>
      </template>
    </Column>
    <Column field='quantity' header='Hoeveelheid' :sortable='true'>
      <template #body="{data}">
        {{data.quantity}}
      </template>
      <template #filter="{filterModel}">
          <InputText type="text" v-model="filterModel.value"
          class="p-column-filter" placeholder="Search by description"/>
      </template>
    </Column>
    <Column field='createdAt' header='Toegevoegd' :sortable='true' dataType='date'>
      <template #body='{data}'>
        {{formatDate(data.createdAt)}}
      </template>
      <template #filter="{filterModel}">
        <Calendar v-model="filterModel.value" dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" />
      </template>
    </Column>
    <Column field='place.label' header='Plaats' :sortable='true' :showFilterMatchModes="false"
      filterField='place.id'>
      <template #body="{data}">
        {{formatPlace(data.place)}}
      </template>
      <template #filter="{filterModel}">
          <div class="p-mb-3 p-text-bold">Selecteer plaatsen</div>
          <MultiSelect v-model="filterModel.value"
            :options="[{id: 0, label: '[Onbepaald]'}, ...places2.places.value]"
            optionValue='id' optionLabel='label' placeholder="Any" class="p-column-filter">
            <template #option="{option}">
              <div class="p-multiselect-representative-option">
                {{option.label}}
              </div>
            </template>
          </MultiSelect>
      </template>
    </Column>
    <Column :exportable='false'>
      <template #body='{data}'>
        <span class='clickable clear icon mdi mdi-pencil-outline' @click="editItem(data)"/>
        <span class='clickable warn icon mdi mdi-trash-can-outline' @click="deleteItem(data)"/>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { computed } from 'vue';
import state from '../utils/state';

export default {

  setup() {
    const { places2, items, itemFilters } = state;
    items.load();
    places2.load();

    const loads = computed(() => items.loading.value || places2.loading.value);

    function formatDate(date) {
      return new Intl.DateTimeFormat('nl-BE').format(date);
    }

    function formatPlace(place) {
      return place ? place.label : '';
    }

    function editItem(item) {
      console.log('edititem', item);
    }

    function deleteItem(item) {
      console.log('deleteitem', item);
    }

    return {
      items,
      editItem,
      deleteItem,
      loads,
      formatDate,
      formatPlace,
      itemFilters,
      places2,
    };
  },

};
</script>

<style>
.clickable:hover {
  cursor: pointer;
}

.clear {
  color: var(--primary-color);
}

.warn {
  color: red;
}

</style>
