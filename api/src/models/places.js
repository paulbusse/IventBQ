const { DataTypes, Model } = require('sequelize');

class Place extends Model {
  static init(sequelize) {
    super.init({
      label: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [1, 20],
        },
      },
    }, {
      sequelize,
      modelName: 'Places',
    });
    return Place;
  }

  static associate(models) {
    Place.hasMany(models.Item, { as: 'items', foreignKey: 'placeid', targetKey: 'id' });
  }
}

module.exports = Place;
