<template>
  <Suspense>
    <template #default>
      <div ref='refTable' >
        <DataTable :value='places.places' :scrollable='true' :scrollHeight='tableHeight'>
          <Column field='id' header='#' :style="{flex:'0 0 100px'}"/>
          <Column field='label' header='Naam'/>
        </DataTable>
      </div>
    </template>
    <template #fallback>
      <div>
        loading...
      </div>
    </template>
  </Suspense>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import state from '../utils/state';
import svcPlaces from '../service/places';

export default {
  name: 'PlacesTable',

  async setup() {
    const places = reactive(state.places);
    const refTable = ref(null);
    const tableHeight = ref('');

    onMounted(() => {
      let { top } = refTable.value.getBoundingClientRect();
      top += 8; // add a margin to the viewport
      tableHeight.value = `calc(100vh - ${top}px)`;
    });

    if (state.places.length === 0) {
      const data = await svcPlaces.getAllPlacesASync();
      state.places.set(data);
    }

    return {
      places,
      refTable,
      tableHeight,
    };
  },
};
</script>

<style>

.t_places_id_h {
  width:  6em;
}
.t_places_id_b {
  width:  6em;
}
.t_places_id_f {
  width:  6em;
}
</style>
