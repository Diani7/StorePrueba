import { DataTypes } from 'sequelize';

/**
 * Define el modelo de Usuario con sus propiedades.
 * @param {Sequelize} sequelizeInstance - Instancia de conexión de Sequelize.
 * @returns {Sequelize.Model} Modelo de Usuario.
 */
const User = (sequelizeInstance) => {
    return sequelizeInstance.define(
        'User',
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM(['admin', 'customer']),
                allowNull: false,
            }
        }
    );
}

export default User;
