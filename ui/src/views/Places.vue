<template>
  <Card>
    <template #title>
      <div class='table_title'>
        <span class='table_title'>Lijst van de plaatsen&nbsp;&nbsp;</span>
        <Button label="Nieuw" class="p-button-outlined" @click='newPlace=true'/>
        <NewPlace @close='closeNewPlace' v-bind:visible="newPlace"/>
      </div>
    </template>
    <template #content>
      <DataTable :value='places'>
        <Column field='id' header='#'
          headerClass='t_places_id_h' bodyClass='t_place_id_b' footerClass='t_place_if_f'/>
        <Column field='label' header='Naam'/>
      </DataTable>
    </template>
  </Card>
</template>

<script>
import NewPlace from './newplace.vue';

export default {
  data() {
    return {
      places: null,
      newPlace: false,
      messages: [],
    };
  },

  components: {
    NewPlace,
  },

  mounted() {
    this.getAllPlaces();
  },

  methods: {
    getAllPlaces() {
      this.axios.get('/places')
        .then((res) => {
          this.places = res.data;
        })
        .catch(() => {
          this.$toast.add({
            severity: 'error',
            summary: 'Server fout',
            details: 'Het ophalen van de plaatsen is mislukt!',
          });
        });
    },

    closeNewPlace() {
      this.newPlace = false;
      this.getAllPlaces();
    },

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
.table_title {
  font-weight: bold;
  text-align: center;
  padding-left: 20pt;
}
.my-p-field  {
  display: block;
  text-align: left;
}
.p-inputtext {
  display: block;
}
</style>
