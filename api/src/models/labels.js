const { DataTypes, Model } = require('sequelize');

class Label extends Model {
  static init(sequelize) {
    super.init({
      state: {
        type: DataTypes.ENUM,
        values: ['Locked', 'Assigned', 'Free', 'Deleted'],
        defaultValue: 'Locked',
        allowNull: false,
      },
      locker: {
        type: DataTypes.STRING,
      },
    }, {
      sequelize,
      modelName: 'Labels',
    });
  }

  static associate(models) {
    Label.hasOne(models.Item, { as: 'label', foreignKey: 'labelid', targetKey: 'id' });
  }
}

module.exports = Label;
