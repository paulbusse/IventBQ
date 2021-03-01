import Items from '../classes/items';
import Labels from '../classes/labels';
import Places from '../classes/places';

const state = {};

state.labels = new Labels();
state.places = new Places();
state.createItems = new Items(state.labels);
state.modifiedCreateItems = 0;

export default state;
