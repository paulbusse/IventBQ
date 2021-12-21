/* eslint-disable no-console */
const IvtsError = require('../classes/ivtserror');
const { errHandler, errStatus } = require('../utils/error');
const Place = require('../models/places');

exports.getAll = async function getAll(req, res) {
  console.log('GET /places');
  const places = await Place.findAll();
  res.status(200).json(places);
};

exports.create = function create(req, res) {
  console.log('POST /places');

  const { label } = req.body;
  label.trim();
  if (!label) {
    const msg = new IvtsError('IE16');
    res.status(errStatus(msg)).json(errHandler('E3', msg));
    return;
  }
  Place.create({ label })
    .then(() => {
      Place.findOne({ where: { label } })
        .then((data) => res.status(201).json(data))
        .catch((err) => {
          const error = errHandler('E3', err);
          res.status(400).json(error);
        });
    })
    .catch((err) => {
      const error = errHandler('E3', err);
      res.status(400).json(error);
    });
};

exports.destroy = function destroy(req, res) {
  console.log('DELETE /places/:id');
  res.status(404).json({ status: 'Not implemented yet' });
};
