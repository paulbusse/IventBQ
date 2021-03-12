import Items from '../classes/items';
import Labels from '../classes/labels';
import Places from '../classes/places';
import ItemDescriptions from '../classes/itemdescriptions';

const state = {};

state.labels = new Labels();
state.places = new Places();
state.createItems = new Items(state.labels);
state.itemDescriptions = new ItemDescriptions();
state.modifiedCreateItems = 0;

export default state;
