import _ from 'lodash';

import { simpleRun } from '../utils/unique';

const ids = _.range(1, 100);

export default class Items extends Array {
  add(item) {
    const newItem = item;
    newItem.ids = [...ids.splice(0, item.count)];
    newItem.key = simpleRun();
    newItem.class = 'create';

    this.unshift(newItem);
  }

  set(key, values) {
    const index = this.findIndex((item) => item.key === key);
    const item = this[index];

    item.description = values.description;
    item.quantity = values.quantity;
    item.place = values.place;

    const diff = item.count - values.count;
    console.log('set', diff);
    if (diff > 0) {
      item.ids.splice(item.ids.length - diff, item.ids.length);
    } else if (diff < 0) {
      item.ids.push(...ids.splice(0, -diff));
    }
    item.count = values.count;
    console.log('set', item);
  }

  delete(key) {
    const index = this.findIndex((item) => item.key === key);
    const item = this[index];

    // TODO Delete in case of other classes
    if (item.class === 'create') {
      this.splice(index, 1);
      ids.splice(0, 0, ...item.ids);
    }
  }
}
