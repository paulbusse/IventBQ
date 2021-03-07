import ivts from '../utils/ivts';
import {
  messenger, error, plural, conjugate,
} from '../utils/notify';

function create(items, cbResults) {
  ivts.post('/items', items)
    .then((res) => {
      console.log('items service create', res);
      let count = items.length;
      const { successCnt, errorCnt } = res.data;
      const summary = 'Bewaren van artikelen';
      let severity = 'info';
      let detail = '';
      if (successCnt === count) {
        severity = 'success';
        detail = `${count} ${plural('artikel', count)} ${conjugate('werd', count)} succesvol bewaard.`;
      } else {
        severity = 'info';
        detail = `${errorCnt} ${plural('artikel', errorCnt)} ${conjugate('werd', errorCnt)} niet succesvol bewaard.`;
      }
      messenger({ severity, summary, detail });

      count = Math.min(errorCnt, 5);
      res.data.results.forEach((item) => {
        if (count && item.result === 'error') {
          error(item.error);
          count -= 1;
        }
      });
      cbResults(res.data.results);
    }).catch((err) => {
      console.log('items service create', err);
      let detail = err.message;
      if (err.response) {
        const d = err.response.data;
        detail = `${d.message}. (${d.path}: ${d.value}).`;
      }
      error({
        summary: 'Bewaren van goederen is mislukt',
        detail,
      });
    });
}

export default {
  create,
};
