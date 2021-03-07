/* eslint-disable no-console */

const Item = require('../models/items');
const errHandler = require('../utils/error');
const Label = require('../models/labels');
const IvtsError = require('../classes/ivtserror');

const getAll = async function getAll(req, res) {
  res.status(404).json({ status: 'Not implemented yet' });
};

async function doCreate(item) {
  try {
    const label = await Label.findByPk(item.labelid);
    if (!label) throw new IvtsError('IE1', item.labelid);
    if (label.state === 'Assigned') throw new IvtsError('IE2', item.labelid);
    await Item.create(item);
    await label.update({ state: 'Assigned' });
    return { uikey: item.uikey, labelid: item.labelid, result: 'ok' };
  } catch (err) {
    const error = errHandler('E1', err);
    return {
      uikey: item.uikey, labelid: item.labelid, result: 'error', error,
    };
  }
}

const create = async function create(req, res) {
  let items = req.body;
  if (!Array.isArray(req.body)) items = [req.body];

  const promises = [];
  let successCnt = 0;
  let errorCnt = 0;

  items.forEach((item) => {
    promises.push(doCreate(item));
  });

  let results;
  try {
    results = await Promise.all(promises);
    console.log('create', results);
    results.forEach((element) => {
      if (element.result === 'ok') successCnt += 1;
      else errorCnt += 1;
    });
    res.status(200).json({ successCnt, errorCnt, results });
  } catch (err) {
    const error = errHandler('E1', err);
    res.status(400).json({
      successCnt, errorCnt, error, results,
    });
  }
};

const destroy = function destroy(req, res) {
  res.status(404).json({ status: 'Not implemented yet' });
};

module.exports = {
  getAll,
  create,
  destroy,
};
