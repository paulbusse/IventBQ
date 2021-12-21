const { DataTypes, Model } = require('sequelize');
const Label = require('./labels');
const IvtsError = require('../classes/ivtserror');

class Item extends Model {
  static init(sequelize) {
    super.init({
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: DataTypes.STRING,
      uikey: DataTypes.STRING,
      labelid: {
        type: DataTypes.NUMBER,
        unique: true,
        allowNull: false,
      },
      placeid: DataTypes.NUMBER,
      deletedAt: DataTypes.DATE,
    }, {
      sequelize,
      paranoid: true,
      modelName: 'Items',
    });
  }

  static async create(fields) {
    if (!('description' in fields)) throw new IvtsError('IE16', 'description');
    fields.description.trim();
    if (!fields.description) throw (new IvtsError('IE17', 'description'));

    if (!('labelid' in fields)) throw (new IvtsError('IE16', 'labelid'));
    fields.labelid.trim();
    if (!fields.labelid) throw (new IvtsError('IE17', 'labelid'));
    const label = await Label.findByPk(fields.labelid);
    if (!label) throw new IvtsError('IE1', 'etiket', fields.labelid);
    if (label.state === 'Assigned') throw new IvtsError('IE2', fields.labelid);

    const item = await super.create(fields);
    label.update({ state: 'Assigned' });
    return item;
  }

  destroy() {
    Label.update({ state: 'Deleted' }, { where: { id: this.labelid } });
    super.destroy();
  }

  restore() {
    Label.update({ state: 'Assigned' }, { where: { id: this.labelid } });
    super.restore();
  }

  static associate(models) {
    Item.belongsTo(models.Label, { as: 'label', foreignKey: 'labelid', targetKey: 'id' });
    Item.belongsTo(models.Place, { as: 'place', foreignKey: 'placeid', targetKey: 'id' });
  }
}

module.exports = Item;
