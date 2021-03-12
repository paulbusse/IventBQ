import ivts from '../utils/ivts';
import { error } from '../utils/notify';

function getAllPlaces(places) {
  ivts.get('/places')
    .then((res) => {
      places.push(...res.data);
    })
    .catch(() => {
      error({
        summary: 'Server fout',
        detail: 'Het ophalen van de plaatsen is mislukt!',
      });
    });
}

async function getAllPlacesASync() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const { data: response } = await ivts.get('/places');
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

async function create(label) {
  try {
    const { data: response } = await ivts.post('/places', { label });
    return response;
  } catch (err) {
    error(err.response.data);
  }
  return null;
}

export default {
  getAllPlaces,
  getAllPlacesASync,
  create,
};
