/* eslint-disable no-console */
const Place = require('../models/places');

exports.getAll = async function getAll(req, res) {
  console.log('GET /places');
  const places = await Place.findAll();
  res.status(200).json(places);
};

exports.create = function create(req, res) {
  console.log('POST /places');

  const label = req.body.name;
  Place.create({ label })
    .then(() => {
      Place.findOne({ where: { label } })
        .then((data) => res.status(201).json(data))
        .catch((error) => {
          const noterr = error.errors[0];
          const err = {
            code: 'C_P_2',
            message: noterr.message,
            path: noterr.path,
            value: noterr.value,
          };

          console.log(err);
          res.status(400).json(err);
        });
    })
    .catch((error) => {
      const noterr = error.errors[0];
      const err = {
        code: 'C_P_1',
        message: noterr.message,
        path: noterr.path,
        value: noterr.value,
      };
      console.log(err);
      res.status(400).json(err);
    });
};

exports.destroy = function destroy(req, res) {
  console.log('DELETE /places/:id');
  res.status(404).json({ status: 'Not implemented yet' });
};
