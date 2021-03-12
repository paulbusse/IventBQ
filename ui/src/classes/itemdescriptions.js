import svcItems from '../service/items';

export default class ItemDescriptions {
  constructor() {
    this.descriptions = [];
    const cbLoader = this.loader.bind(this);
    svcItems.getDescriptions(cbLoader);
  }

  loader(descs) {
    this.descriptions = descs;
  }

  add(value) {
    const index = this.descriptions.findIndex((el) => el >= value);
    if (this.descriptions[index] !== value) { this.descriptions.splice(index, 0, value); }
  }
}
