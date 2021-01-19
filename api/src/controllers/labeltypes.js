const fs = require('fs');
const yaml = require('yaml');

exports.getAll = (req, res) => {
  try {
    const file = fs.readFileSync('../data/labeltypes.yaml', 'utf-8');
    const pfile = yaml.parse(file);
    const types = [];
    pfile.forEach((element) => {
      types.push(element.name);
    });
    res.status(200).json(types);
  } catch (error) {
    // Should not happen!
    res.status(500).send();
  }
};
