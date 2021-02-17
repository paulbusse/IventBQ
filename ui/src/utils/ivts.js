import axios from 'axios';

const ivts = axios.create();
ivts.defaults.baseURL = 'http://localhost:4000';

export default ivts;
