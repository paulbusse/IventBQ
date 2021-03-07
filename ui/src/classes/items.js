import { simpleRun } from '../utils/unique';
import svcItems from '../service/items';

export default class Items extends Array {
  constructor(labels) {
    super();
    this.labels = labels;
    console.log(this);
  }

  add(item) {
    console.log(this);
    const newItem = item;
    newItem.labels = [...this.labels.takeOff(item.count)];
    newItem.key = simpleRun();
    newItem.class = 'create';

    this.unshift(newItem);
  }

  set(key, values) {
    const index = this.findIndex((item) => item.key === key);
    const item = this[index];
    console.log('set', item, key, values);

    item.description = values.description;
    item.quantity = values.quantity;
    item.place = values.place;

    const diff = item.count - values.count;
    console.log('set', diff);
    if (diff > 0) {
      item.labels.splice(item.labels.length - diff, item.labels.length);
    } else if (diff < 0) {
      // item.labels.push(...this.labels.tafeOff(-diff));
      const nl = this.labels.takeOff(-diff);
      console.log(nl);
      item.labels.push(...nl);
    }
    item.count = values.count;
  }

  delete(key) {
    const index = this.findIndex((item) => item.key === key);
    const item = this[index];

    // TODO Delete in case of other classes
    if (item.class === 'create') {
      this.splice(index, 1);
    }
  }

  cbCreate(results) {
    console.log('cbCreate', results, this);
    results.forEach((res) => {
      const item = this.find((el) => el.key === res.uikey);
      if (item.class !== 'error') {
        if (res.result === 'error') {
          item.class = 'error';
          item.message = res.error.detail;
        } else {
          item.class = 'locked';
          item.message = '';
        }
      }
    });
    console.log('cbCreate', this);
  }

  backendSync() {
    this.create = [];
    const { create } = this;
    this.forEach((item) => {
      if (item.class !== 'locked') {
        item.labels.forEach((labelid) => create.push({
          description: item.description,
          quantity: item.quantity,
          place: item.place.id,
          labelid,
          uikey: item.key,
        }));
      }
    });
    console.log('backendSync', this);
    const boundCreate = this.cbCreate.bind(this);
    if (this.create.length) svcItems.create(this.create, boundCreate);
  }
}
