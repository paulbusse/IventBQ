<template>
  <div>
    <div class="my-p-field">
      <label for="placename">Naam voor de plaats</label>
      <InputText id="placename" type="text" aria-describedby="placename-help" v-model="label"/>
      <small v-if='errmsg === null' id="placename-help">Verplicht veld, maximum 20 tekens.</small>
      <small v-if='errmsg !== null' class="invalid" id="placename-help">{{errmsg}}</small>
    </div>
    <Button label="Cancel" icon="pi pi-times" @click="close(false)"
      class="p-button-outlined p-button-secondary"/>
    <Button label="Nieuw" icon="pi pi-check" @click="close(true)"
      class='p-button-outlined' autofocus :disabled='disabled'/>
  </div>
</template>

<script>

import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import state from '../utils/state';
import svcPlaces from '../service/places';

export default {
  setup() {
    const label = ref('');
    const errmsg = ref(null);
    const router = useRouter();

    const disabled = computed(() => label.value.length > 20 || label.value.length === 0);

    watch(label,
      (cur) => {
        if (cur.length === 0) {
          errmsg.value = 'Verplicht veld';
        } else if (cur.length > 20) {
          errmsg.value = 'Maximaal 20 tekens';
        } else {
          errmsg.value = null;
        }
      });

    async function close(create) {
      if (create) {
        const place = await svcPlaces.create(label.value);
        if (place) {
          state.places.add(place);
          router.go(-1);
        }
        return;
      }
      router.go(-1);
    }

    return {
      label,
      errmsg,
      disabled,
      close,
    };
  },
};
</script>

<style lang="scss" scoped>
.my-p-field  {
  display: block;
  text-align: left;
}
.p-inputtext {
  display: block;
}

.p-button-outlined {
  margin: 10px 10px 10px 10px;
}

.invalid {
  color: red;
}
</style>
