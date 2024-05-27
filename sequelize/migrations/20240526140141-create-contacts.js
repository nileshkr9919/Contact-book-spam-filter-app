'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contacts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Seed the Contacts table with dummy data
    await queryInterface.bulkInsert('Contacts', [
      {
        name: 'Jane Smith',
        phoneNumber: '1231231234',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bob Johnson',
        phoneNumber: '4564564567',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more dummy data as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contacts');
  },
};
