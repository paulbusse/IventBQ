import ivts from '../utils/ivts';
import notify from '../utils/notify';

function getAllPlaces(places) {
  ivts.get('/places')
    .then((res) => {
      places.load(res.data);
    })
    .catch(() => {
      notify.error({
        summary: 'Server fout',
        detail: 'Het ophalen van de plaatsen is mislukt!',
      });
    });
}

export default {
  getAllPlaces,
};
