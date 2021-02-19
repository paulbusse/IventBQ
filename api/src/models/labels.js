const { DataTypes, Model } = require('sequelize');

class Label extends Model {
  static init(sequelize) {
    super.init({
      state: {
        type: DataTypes.ENUM,
        values: ['Locked', 'Assigned', 'Free'],
        defaultValue: 'Locked',
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Labels',
    });
  }
}

module.exports = Label;
