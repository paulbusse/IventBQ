module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Labels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      state: {
        type: Sequelize.ENUM,
        values: ['Locked', 'Assigned', 'Free', 'Deleted'],
        defaultValue: 'Locked',
        allowNull: false,
      },
      locker: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Labels');
  },
};
