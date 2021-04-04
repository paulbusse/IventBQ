import { ref } from 'vue';
import { FilterService, FilterMatchMode, FilterOperator } from 'primevue/api';

export default class ItemFilters {
  constructor() {
    this.filters = ref({});
    this.reset();
    FilterService.register('PlacesIn', ItemFilters.placesInFilter);
  }

  static placesInFilter(value, filter) {
    if (filter == null) return true;

    const lvalue = value == null ? 0 : value;
    return filter.findIndex((v) => v === lvalue) >= 0;
  }

  reset() {
    this.filters.value = {
      labelid: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      description: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      quantity: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      'place.id': { value: null, matchMode: 'PlacesIn' },
      createdAt: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
    };
  }

  update(f) {
    console.log('itemfilters.update', f);
    this.filters.value = f;
  }
}
