const { DataTypes, Model } = require('sequelize');

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
    }, {
      sequelize,
      modelName: 'Items',
    });
  }

  static associate(models) {
    Item.belongsTo(models.Label);
    Item.belongsTo(models.Place, { as: 'place', foreignKey: 'placeid', targetKey: 'id' });
  }
}

module.exports = Item;
