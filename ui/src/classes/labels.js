/*
 * This class tries to keep the nr of locked labels close to 100
 * But also tries to avoid using the same labels from 2 locations.
 *
 * - it refreshes the labels every 12 hours
 * - whenever 10 or more labels are used, it locks some more labels
 */
import svcLabels from '../service/labels';

class Labels {
  constructor() {
    this.lLabels = [];
    svcLabels.lockLabels(100, this.lLabels);
    setInterval(() => {
      const nLabels = [];
      svcLabels.lockLabels(100, nLabels);
      this.lLables = nLabels;
    }, 12 * 60 * 60 * 1000); // every 12 hours
  }

  takeOff(n) {
    this.reload();
    return this.lLabels.splice(0, n);
  }

  reload() {
    const diff = 100 - this.lLabels.length;
    if (diff > 10) svcLabels.lockLabels(diff, this.lLabels);
  }
}

export default Labels;
