'use strict';
const { hash } = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        phoneNumber: '1234567890',
        email: 'john@example.com',
        password: await hash('password123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        phoneNumber: '0987654321',
        email: 'jane@example.com',
        password: await hash('password123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more dummy users as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
