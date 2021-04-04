import { ref } from 'vue';
import svcPlaces from '../service/places';

export default class Places2 {
  constructor() {
    this.places = ref([]);
    this.loading = ref(true);
  }

  get length() {
    return this.places.value.length;
  }

  getById(id) {
    return this.places.value.find((place) => place.id === id);
  }

  add(place) {
    this.places.value.push(place);
  }

  doLoad(results) {
    this.places.value = results;
    this.loading.value = false;
  }

  load() {
    if (this.places.value.length) {
      this.loading.value = false;
      return;
    }

    this.loading.value = true;
    const cbLoad = this.doLoad.bind(this);
    svcPlaces.getPlaces(cbLoad);
  }
}
