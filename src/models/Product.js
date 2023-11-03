import { DataTypes } from 'sequelize';
/**
 * Define el modelo de Producto con sus propiedades.
 * @param {Sequelize} sequelizeInstance - Instancia de conexión de Sequelize.
 * @returns {Sequelize.Model} Modelo de Producto.
 */
const Product = (sequelizeInstance) => sequelizeInstance.define(
    'Product', 
    {
        lote: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dateAdded: {
            type: DataTypes.DATE
        }
    }
);

export default Product;
