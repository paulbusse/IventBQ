import ivts from '../utils/ivts';
import notify from '../utils/notify';

function getAllPlaces(places) {
  ivts.get('/places')
    .then((res) => {
      places.push(...res.data);
      console.log(places);
    })
    .catch(() => {
      notify.error({
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
      console.log('getAllPlacesASync', response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

async function create(label) {
  try {
    const { data: response } = await ivts.post('/places', { name: label });
    return response;
  } catch (err) {
    let detail = err.message;
    if (err.response) {
      const d = err.response.data;
      detail = `${d.message}. (${d.path}: ${d.value}).`;
    }
    notify.error({
      summary: 'Aanmaken van nieuw plaats is mislukt',
      detail,
    });
  }
  return null;
}

export default {
  getAllPlaces,
  getAllPlacesASync,
  create,
};
