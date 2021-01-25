const LabelTypes = require('../../classes/labeltypes');

exports.getAll = (req, res) => {
  try {
    res.status(200).json(LabelTypes.getNames());
  } catch (error) {
    // Should not happen!
    res.status(500).send();
  }
};
