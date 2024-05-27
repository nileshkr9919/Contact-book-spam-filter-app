'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
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
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
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

    // Seed the Users table with dummy data
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        phoneNumber: '1234567890',
        email: 'john@example.com',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alice Smith',
        phoneNumber: '9876543210',
        email: 'alice@example.com',
        password: 'password456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more dummy data as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
