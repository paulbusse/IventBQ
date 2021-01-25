const { spawn } = require('child_process');
const CsvWriter = require('csv-writer');
const Label = require('../models/label');

class LabelFile {
  constructor(name, labeltype, count) {
    this.name = name;
    this.labeltype = labeltype;
    this.count = count;
  }

  async lockIds() {
    // Generate the list of ids
    const labellist = await Label.lock(this.name, this.count);
    this.idlist = [];
    labellist.forEach((element) => this.idlist.push(element.id));
  }

  async generateCsv() {
    const csvWriter = CsvWriter.createObjectCsvWriter({
      path: `../data/labelfiles/${this.name}.csv`,
      header: [
        { id: 'id', title: 'id' },
        { id: 'url', title: 'url' },
      ],
    });
    await csvWriter.writeRecords(this.idlist.map((id) => ({
      id,
      url: `standard url ${id}`,
    })));
  }

  async generatePdf() {
    const path = '../data/labelfiles/';
    const generate = spawn('bin/generate_labels', [
      `${path}${this.name}.csv`,
      `${path}${this.name}.pdf`,
      this.labeltype.labelfile]);

    generate.on('exit', (code, signal) => {
      if (code || signal) throw (new Error({ code, signal }));
    });
  }
}

module.exports = LabelFile;
