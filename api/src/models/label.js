const { DataTypes, Model } = require('sequelize');

class Label extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      state: {
        type: DataTypes.ENUM,
        /*
        * Printing: the label is in a label file. We are unsure the label is printed
        * Free:     the label is printed and can be assigned
        * Used:     the label is assigned
        * Deleted:  the object to which the label is assigned is no longer present
        */
        values: ['Printing', 'Free', 'Used', 'Deleted'],
        defaultValue: 'Printing',
        allowNull: false,
      },
      fileId: {
        type: DataTypes.STRING,
      },
      scannedBy: {
        type: DataTypes.STRING,
      },
      scanDate: {
        type: DataTypes.DATE,
      },
    }, { sequelize });
  }

  static async lock(fileId, limit) {
    const els = Array(limit).fill({ fileId, state: 'Printing' });
    try {
      await Label.bulkCreate(els);
      const all = await Label.findAll({
        where: {
          fileId,
        },
      });
      return all;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return null;
    }
  }
}

module.exports = Label;
