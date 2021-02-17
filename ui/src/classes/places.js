import svcPlaces from '../service/places';

export default class Places extends Array {
  constructor() {
    super();
    svcPlaces.getAllPlaces(this);
    this.push({ id: 0, label: 'loading...' });
  }

  load(data) {
    this.length = 0;
    data.forEach((el) => this.push(el));
    console.log(this);
  }
}
