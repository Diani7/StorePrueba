const { Sequelize } = require('sequelize');

export default new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME,
  dialect: 'mariadb',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  modelPaths: [`${__dirname}/models`],
  define: {
    underscored: true,
    charset: 'utf8',
    timestamps: true,
  },
});
