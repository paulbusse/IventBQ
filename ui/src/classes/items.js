import { ref } from 'vue';
import svcItems from '../service/items';

export default class Items {
  constructor() {
    this.items = ref([]);
    this.loading = ref(true);
  }

  doLoad(results) {
    this.items.value = results;
    // eslint-disable-next-line no-return-assign, no-param-reassign
    this.items.value.forEach((item) => item.createdAt = new Date(item.createdAt));
    this.loading.value = false;
  }

  load() {
    if (this.items.value.length) {
      this.loading.value = false;
      return;
    }

    this.loading.value = true;
    const cbLoad = this.doLoad.bind(this);
    svcItems.getStored(cbLoad);
  }

  loadA() {
    if (this.items.value.length) {
      this.loading.value = false;
      return null;
    }

    this.loading.value = true;
    const cbLoad = this.doLoad.bind(this);
    return svcItems.getStored(cbLoad);
  }

  reset() {
    this.items.value = [];
  }
}
