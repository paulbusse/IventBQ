const { Op } = require('sequelize');
const moment = require('moment');
const Label = require('../models/labels');
const { simple } = require('../utils/unique');

exports.put = async function put(req, res) {
  const result = [];
  const locker = simple();

  while (result.length < req.body.count) {
    let count = req.body.count - result.length;
    // eslint-disable-next-line no-await-in-loop
    const locked = await Label.update({
      locker,
    }, {
      where: {
        [Op.or]: [{
          state: 'Locked',
          updatedAt: {
            [Op.lt]: moment().subtract(1, 'days').toDate(),
          },
        }, {
          state: 'Deleted',
          updatedAt: {
            [Op.lt]: moment().subtract(30, 'days').toDate(),
          },
        },
        ],
      },
      limit: count,
    });

    count -= locked[0];
    const els = Array(count).fill({ locker });
    // eslint-disable-next-line no-await-in-loop
    await Label.bulkCreate(els);

    // eslint-disable-next-line no-await-in-loop
    const qr = await Label.findAll({
      where: { locker },
    });

    qr.forEach((el) => result.push(el.id));
  }

  res.status(200).json(result);
};
