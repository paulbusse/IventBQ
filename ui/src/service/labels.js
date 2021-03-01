import ivts from '../utils/ivts';
import notify from '../utils/notify';

function lockLabels(count, arr) {
  ivts.put('/labels', { count })
    .then((res) => {
      arr.push(...res.data);
      console.log('LockLables', arr);
    }).catch((err) => {
      let detail = err.message;
      if (err.response) {
        const d = err.response.data;
        detail = `${d.message}. (${d.path}: ${d.value}).`;
      }
      notify.error({
        summary: 'Aanmaken van nieuw plaats is mislukt',
        detail,
      });
    });
}

export default {
  lockLabels,
};
