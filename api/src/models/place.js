'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('place', {
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
        len: [1,20],
      }
    } 
  });
  return Place;
};