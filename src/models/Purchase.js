import { DataTypes } from 'sequelize';
/**
 * Define el modelo de Compra con sus propiedades y la relación con el modelo de Usuario.
 * @param {Sequelize} sequelizeInstance - Instancia de conexión de Sequelize.
 * @param {Sequelize.Model} userInstance - Modelo de Usuario para la clave foránea.
 * @returns {Sequelize.Model} Modelo de Compra.
 */
const Purchase = (sequelizeInstance, userInstance) => {
  return sequelizeInstance.define('Purchase', {
      price: {
          type: DataTypes.FLOAT,
          allowNull: false,
      },
      userId: {
          type: DataTypes.INTEGER,
          references: {
            model: userInstance,
            key: 'id'
          },
          allowNull: false,
      },
      totalProducts: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
  });
}

export default Purchase;