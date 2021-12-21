/* eslint-disable no-console */
const { Sequelize } = require('sequelize');

const Item = require('../models/items');
const Place = require('../models/places');
const IvtsError = require('../classes/ivtserror');

const { errHandler, errStatus } = require('../utils/error');
const logger = require('../utils/logger');

/*
 * Utilities
 */
const uiQueryOptions = {
  attributes: [
    'id',
    'description',
    'quantity',
    'uikey',
    'labelid',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
  include: [{
    model: Place,
    as: 'place',
    attributes: ['id', 'label'],
  }],
};

function canUpdate(body, item) {
  if ('updatedAt' in body) {
    const dtUpdatedAt = new Date(body.updatedAt);
    return dtUpdatedAt.getTime() === item.updatedAt.getTime();
  }
  return false;
}

/*
 * GET /items
 */
async function itemDescriptions(res) {
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

async function itemsStored(res) {
  try {
    const items = await Item.findAll({
      ...uiQueryOptions,
      order: [['createdAt', 'ASC']],
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json(errHandler('E2', error));
  }
}

async function itemById(id, res) {
  try {
    const item = await Item.findByPk(id, { ...uiQueryOptions, paranoid: false });
    if (item === null) throw (new IvtsError('IE4'));

    res.status(200).json(item);
    return;
  } catch (error) {
    res.status(errStatus(error)).json(errHandler('E2', error));
  }
}

const find = async function find(req, res) {
  if ('p' in req.query) {
    switch (req.query.p) {
      case 'itemdescriptions':
        itemDescriptions(res);
        break;
      case 'stored':
        itemsStored(res);
        break;
      default: {
        const err = new IvtsError('IE17', 'p');
        res.status(errStatus(err)).json(errHandler('E2', err));
        break;
      }
    }
    return;
  }

  if ('id' in req.params) {
    itemById(req.params.id, res);
  } else { res.status(404).json({ status: 'Not implemented yet (find)' }); }
};

/*
 * POST /items
 */

const create = async function create(req, res) {
  const itemFields = req.body;
  try {
    const item = await Item.create(itemFields);
    const result = await Item.findByPk(item.id, uiQueryOptions);
    res.status(200).json(result);
  } catch (error) {
    res.status(errStatus(error)).json(errHandler('E1', error));
  }
};
/*
const old_create = async function old_create(req, res) {
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
*/

/*
 * PATCH /items
 */
const patch = async function patch(req, res) {
  const { itemid } = req.params;
  const { body } = req;
  let item = null;
  let msg = null;
  let msgcode = 'IE8';
  try {
    item = await Item.findByPk(itemid, { paranoid: false });
    if (!item) msgcode = 'IE4';
    if (!canUpdate(body, item)) msgcode = 'IE5';
    if ('id' in body && body.id !== item.id) msgcode = 'IE6';
    if ('labelid' in body && body.labelid !== item.labelid) msgcode = 'IE6';
    if ('description' in body) item.description = body.description;
    if ('quantity' in body)item.quantity = body.quantity;
    if ('place' in body)item.placeid = body.place.id;
    if ('uikey' in body) item.uikey = body.key;

    if (msgcode === 'IE8') await item.save();
    await item.reload({ ...uiQueryOptions, paranoid: false });
    msg = new IvtsError(msgcode);
  } catch (err) {
    msg = err;
  }
  const status = errStatus(msg);
  const message = errHandler('E4', msg);
  if (item !== null) res.status(status).json({ message, item });
  else res.status(status).json(message);
};

/*
 * DELETE /items
 */
const destroy = function destroy(req, res) {
  res.status(404).json({ status: 'Not implemented yet' });
};

/*
 * POST /items/:id/actions
 */
const act = async function act(req, res) {
  const { itemid } = req.params;
  const { body } = req;
  let msgcode = null;
  let msg = null;

  try {
    if (!body.action) throw (new IvtsError('IE14'));
    const { action } = body;

    const item = await Item.findByPk(itemid, { paranoid: false });
    if (!item) throw (new IvtsError('IE4'));

    switch (action) {
      case 'destroy':
        if (item.isSoftDeleted()) { msgcode = 'IE12'; break; }
        if (!canUpdate(body, item)) {
          msgcode = 'IE5';
          break;
        }
        await item.destroy();
        msgcode = 'IE9';
        break;

      case 'restore':
        if (!item.isSoftDeleted()) { msgcode = 'IE13'; break; }
        if (!canUpdate(body, item)) {
          msgcode = 'IE5';
          break;
        }
        await item.restore();
        msgcode = 'IE10';
        break;

      default:
        logger.info(`Bad message code: ${action}`);
        msgcode = 'IE11';
    }
    msg = new IvtsError(msgcode);
  } catch (error) {
    msg = error;
  }
  const status = errStatus(msg);
  res.status(status).json(errHandler('E4', msg));
};

module.exports = {
  find,
  create,
  destroy,
  patch,
  act,
};
