const { DataTypes, Model } = require('sequelize');

class Item extends Model {
  static init(sequelize) {
    super.init({
      description: DataTypes.STRING,
      quantity: DataTypes.STRING,
      uikey: DataTypes.STRING,
      labelid: DataTypes.NUMBER,
      placeid: DataTypes.NUMBER,
    }, {
      sequelize,
      modelName: 'Items',
    });
  }

  static associate(models) {
    Item.belongsTo(models.Label);
    Item.belongsTo(models.Place);
  }
}

module.exports = Item;
