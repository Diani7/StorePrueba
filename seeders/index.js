// export const usersSeed = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert('Users', [
//       {
//         username: 'dimctes',
//         password: '123456',
//         role: 'admin',
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         username: 'cliente 1',
//         password: '123456',
//         role: 'customer',
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         username: 'cliente 2',
//         password: '654321',
//         role: 'customer',
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//   ]);
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete('Users', null, {});
//   }
// };

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        lote: 'ABC123',
        name: 'Memoria RAM DDR5 32GB',
        stock: 20,
        price: 250000,
        dateAdded: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // {
      //   lote: 'ABC123',
      //   name: 'Memoria RAM DDR5 32GB',
      //   stock: 20,
      //   price: 250000,
      //   dateAdded: new Date(),
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   lote: 'ABC123',
      //   name: 'Memoria RAM DDR5 32GB',
      //   stock: 20,
      //   price: 250000,
      //   dateAdded: new Date(),
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
}; 
