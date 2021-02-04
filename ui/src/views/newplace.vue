<template>
  <Dialog header="Nieuwe plaats"  :modal="true">
    <div class="my-p-field">
      <label for="placename">Naam voor de plaats</label>
      <InputText id="placename" type="text" aria-describedby="placename-help" class=""
        v-model="newPlaceName"/>
      <small v-if='errmsg === null' id="placename-help">Verplicht veld, maximum 20 tekens.</small>
      <small v-if='errmsg !== null' class="p-invalid" id="placename-help">{{errmsg}}</small>
    </div>
    <template #footer>
        <Button label="Cancel" icon="pi pi-times" @click="closeNewPlace(false)"
          class="p-button-outlined p-button-secondary"/>
        <Button label="Nieuw" icon="pi pi-check" @click="closeNewPlace(true)"
          class='p-button-outlined' autofocus />
    </template>
  </Dialog>
</template>

<script>
export default {
  name: 'NewPlace',
  data() {
    return {
      newPlaceName: '',
      errmsg: null,
      postdata: {
        name: null,
      },
    };
  },

  watch: {
    newPlaceName(cur) {
      if (cur.length === 0) {
        this.errmsg = 'Verplicht veld';
      } else if (cur.length > 20) {
        this.errmsg = 'Maximaal 20 tekens';
      } else {
        this.errmsg = null;
      }
      this.postdata.name = cur;
    },
  },

  methods: {
    async closeNewPlace(create) {
      if (!create) {
        this.$emit('close');
        return;
      }

      try {
        const res = await this.axios.post('/Places', this.postdata);
        this.$toast.add({
          severity: 'success',
          summary: 'Nieuwe plaats',
          detail: `De plaats '${this.postdata.name}'(${res.data.id}) is gecreëerd.`,
          life: 5000,
        });
        this.$emit('close');
        return;
      } catch (error) {
        this.errmsg = error.response.data.message;
      }
    },
  },
};
</script>
