// import ivts from '../utils/ivts';
// import notify from '../utils/notify';

function lockLabels(count, arr) {
  console.log('lockLabels', count, arr);
/*  ivts.post('/labels')
    .then((res) => {
      console.log(res);
      arr.push(...res.data.labels);
      places.load(res.data);
    })
    .catch(() => {
      notify.error({
        summary: 'Server fout',
        detail: 'Het ophalen van de plaatsen is mislukt!',
      });
    });
*/
}

export default {
  lockLabels,
};
