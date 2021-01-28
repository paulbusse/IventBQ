const path = require('path');
const LabelTypes = require('../../classes/labeltypes');
const unique = require('../../classes/unique');
const LabelFile = require('../../classes/labelfile');

exports.download = (req, res) => {
  const labelfile = new LabelFile({ fileId: req.params.id });
  const file = labelfile.getFileAbs(req.params.id);
  if (!file) {
    res.status(400).json({ error: 'CLF_4', message: 'De labelfile werd niet gevonden.' });
    return;
  }
  res.status(200).download(file, path.basename(file));
};

exports.create = async (req, res) => {
  //
  // Validate the request
  //
  let err = null;
  if (req.body.type == null) {
    err = { error: 'CLF_1', message: 'Een label type moet worden meegegeven' };
  }

  let msg = '';
  const labeltype = LabelTypes.getByName(req.body.type);
  if (labeltype == null) {
    err = { error: 'CLF_2', message: 'Het meegegeven label type is onbekend' };
  }
  let npages = req.body.npages || 1;
  if (npages > 5) {
    msg += 'Aantal paginas is maximum 5, default 1. ';
    npages = 5;
  }

  if (err !== null) {
    res.status(400).json(err);
    return;
  }

  // Generate unique ID
  const fileId = unique.simple();

  const count = npages * labeltype.labelsperpage;
  const labelFile = new LabelFile({ fileId, labeltype, count });
  try {
    await labelFile.lockIds();
    await labelFile.generateCsv();
    labelFile.generatePdf();
    msg += 'Het PDF-bestand wordt gegeneerd. ';
    const ret = {
      id: fileId, npages, type: labeltype.name, message: msg,
    };
    res.status(201).json(ret);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    err = { error: 'CLF_3', message: 'Er is een fout opgetreden bij het genereren van de labels. Contacteer uw administrator.' };
    res.status(400).json(err);
  }
};
