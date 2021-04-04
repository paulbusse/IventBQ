import event from './event';

// eslint-disable-next-line import/no-cycle
import CreateItems from '../classes/createitems';
import Items from '../classes/items';
import Labels from '../classes/labels';
import Places from '../classes/places';
import Places2 from '../classes/places2';
import ItemDescriptions from '../classes/itemdescriptions';
import ItemFilters from '../classes/itemfilters';

const state = {};

state.labels = new Labels();
state.places = new Places();
state.places2 = new Places2();
state.createItems = new CreateItems(state.labels);
state.items = new Items();
state.itemDescriptions = new ItemDescriptions();
state.itemFilters = new ItemFilters();
state.modifiedCreateItems = 0;

event.on('state', (e) => {
  switch (e.event) {
    case 'new-items':
      state.items.reset();
      state.itemDescriptions.reset();
      break;
    default:
      console.info(`state: unhandled event: ${e}`);
      break;
  }
});

export default state;
