const { DataTypes, Model } = require('sequelize');

class Place extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        primaryKey: true,
      },
      label: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [1, 20],
        },
      },
    }, { sequelize });
  }
}

module.exports = Place;
