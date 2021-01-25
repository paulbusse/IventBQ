/*
 * This class manages the file with the label type definitions and its structure.
 */
const fs = require('fs');
const yaml = require('yaml');

const file = fs.readFileSync('../data/labeltypes.yaml', 'utf-8');
const labeltypes = yaml.parse(file);

class LabelTypes {
  static getNames() {
    const res = [];
    labeltypes.forEach((element) => res.push(element.name));
    return res;
  }

  static getByName(n) {
    return labeltypes.find(({ name }) => name === n);
  }
}

module.exports = LabelTypes;
