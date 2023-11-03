/**
 * Define el modelo de PurchaseProducts que representa la relación muchos a muchos entre Compras y Productos.
 * @param {Sequelize} sequelizeInstance - Instancia de conexión de Sequelize.
 * @returns {Sequelize.Model} Modelo de PurchaseProducts.
 */

import { DataTypes } from "sequelize";

const PurchaseProducts = (sequelizeInstance) => 
  sequelizeInstance.define('PurchaseProducts', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
});


export default PurchaseProducts;