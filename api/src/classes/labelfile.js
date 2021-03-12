const process = require('process');
const { spawn } = require('child_process');
const fs = require('fs');
const CsvWriter = require('csv-writer');
const Label = require('../models/labels');

// FEATURE: add the fileid on the label for easier management

class LabelFile {
  constructor(param) {
    this.fileId = param.fileId;
    this.labeltype = param.labeltype;
    this.count = param.count;
  }

  // eslint-disable-next-line class-methods-use-this
  get path() {
    return '../data/labelfiles';
  }

  getFileAbs() {
    const fn = fs.readdirSync(this.path).find((file) => {
      if (file.startsWith(this.fileId)) return file.endsWith('pdf');
      return false;
    });

    if (!fn) return null;

    return `${process.cwd()}/${this.path}/${fn}`;
  }

  async lockIds() {
    // Generate the list of ids
    const labellist = await Label.lock(this.fileId, this.count);
    this.idlist = [];
    labellist.forEach((element) => this.idlist.push(element.id));
  }

  async generateCsv() {
    const csvWriter = CsvWriter.createObjectCsvWriter({
      path: `${this.path}/${this.fileId}.csv`,
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
    const generate = spawn('bin/generate_labels', [
      `${this.path}/${this.fileId}.csv`,
      `${this.path}/${this.fileId}_${this.labeltype.label}.pdf`,
      this.labeltype.labelfile]);

    generate.on('exit', (code, signal) => {
      if (code || signal) throw (new Error({ code, signal }));
    });
  }
}

module.exports = LabelFile;
