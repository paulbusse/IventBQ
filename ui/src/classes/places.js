import svcPlaces from '../service/places';

export default class Places {
  constructor() {
    this.places = [];
  }

  get length() {
    return this.places.length;
  }

  add(place) {
    this.places.push(place);
  }

  reload() {
    return svcPlaces.getAllPlaces(this.places);
  }

  set(places) {
    this.places = places;
  }
}
