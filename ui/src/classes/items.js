import { simpleRun } from '../utils/unique';

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

  backendSync() {
    console.log('backendSync', this);
  }
}
