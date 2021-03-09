import ivts from '../utils/ivts';
import { error } from '../utils/notify';

function lockLabels(count, arr) {
  ivts.put('/labels', { count })
    .then((res) => {
      arr.push(...res.data);
    }).catch((err) => {
      let detail = err.message;
      if (err.response) {
        const d = err.response.data;
        detail = `${d.message}. (${d.path}: ${d.value}).`;
      }
      error({
        summary: 'Aanvragen van labels is mislukt',
        detail,
      });
    });
}

export default {
  lockLabels,
};
