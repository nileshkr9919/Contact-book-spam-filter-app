'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Spams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isSpam: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
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

    // Seed the Spams table with dummy data
    await queryInterface.bulkInsert('Spams', [
      {
        phoneNumber: '1234567890',
        count: 1,
        isSpam: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phoneNumber: '9876543210',
        count: 2,
        isSpam: true,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more dummy data as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Spams');
  },
};
