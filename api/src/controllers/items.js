/* eslint-disable no-console */
const { Sequelize } = require('sequelize');

const Item = require('../models/items');
const Label = require('../models/labels');
const IvtsError = require('../classes/ivtserror');

const errHandler = require('../utils/error');

/*
 * GET /items
 */
async function itemDescriptions(req, res) {
  const tempDesc = await Item.findAll({
    attributes: [Sequelize.fn('DISTINCT', Sequelize.col('description')), 'description'],
    order: ['description'],
  });
  const descs = [];
  tempDesc.forEach((el) => {
    descs.push(el.description);
  });
  res.status(200).json(descs);
}

const find = async function find(req, res) {
  if ('p' in req.query) {
    console.log(req.query);
    switch (req.query.p) {
      case 'itemdescriptions':
        itemDescriptions(req, res);
        break;
      default: {
        const err = new IvtsError('IE3');
        res.status(400).json(errHandler('E2', err));
        break;
      }
    }
  } else { res.status(404).json({ status: 'Not implemented yet (find)' }); }
};

/*
 * POST /items
 */
async function doCreate(item) {
  try {
    // Validation
    const label = await Label.findByPk(item.labelid);
    if (!label) throw new IvtsError('IE1', item.labelid);

    if (label.state === 'Assigned') throw new IvtsError('IE2', item.labelid);

    // Creation
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

/*
 * DELETE /items
 */
const destroy = function destroy(req, res) {
  res.status(404).json({ status: 'Not implemented yet' });
};

module.exports = {
  find,
  create,
  destroy,
};
