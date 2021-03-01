<template>
  <div>
      <div class='table_title'>
        <span class='table_title'>Lijst van de plaatsen&nbsp;&nbsp;</span>
        <Button label="Nieuw" class="p-button-outlined" @click='goPlaceadd'/>
      </div>
      <Suspense>
        <template #default>
          <PlacesTable/>
        </template>
        <template #fallback>Aan het laden ...</template>
      </Suspense>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PlacesTable from '../components/placestable';

export default {
  components: { PlacesTable },
  setup() {
    const newPlace = ref(false);
    const router = useRouter();

    function goPlaceadd() {
      router.push({ path: 'placeadd' });
    }

    return {
      newPlace,
      goPlaceadd,
    };
  },
};

</script>

<style>

.table_title {
  font-weight: bold;
  text-align: center;
  padding-left: 20pt;
}

</style>
