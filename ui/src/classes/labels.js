import svcLabels from '../service/labels';

class Labels extends Array {
  constructor() {
    super();
    svcLabels.lockLabels(100, this);
  }
}

const labels = new Labels();

export default labels;
