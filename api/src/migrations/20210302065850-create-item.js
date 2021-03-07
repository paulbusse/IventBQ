module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.STRING,
      },
      uikey: {
        type: Sequelize.STRING,
      },
      labelid: {
        type: Sequelize.NUMBER,
        unique: true,
        allowNull: false,
      },
      placeid: {
        type: Sequelize.NUMBER,
        references: {
          model: 'Places',
          key: 'id',
        },
        onDelete: 'SET NULL',
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

    await queryInterface.addConstraint('items', {
      type: 'foreign key',
      fields: ['labelid'],
      name: 'fk_items_label',
      references: {
        table: 'labels',
        field: 'id',
      },
    });

    await queryInterface.addConstraint('items', {
      type: 'foreign key',
      fields: ['placeid'],
      name: 'fk_items_place',
      references: {
        table: 'places',
        field: 'id',
      },
    });

    await queryInterface.addIndex('items', ['labelid']);
    await queryInterface.addIndex('items', ['placeid']);
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    /*
     * This should undo all the actions above in cascase
     */
    await queryInterface.dropTable('items');
  },
};
