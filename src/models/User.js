import { DataTypes } from 'sequelize';

const User = (sequelizeInstance) => {
	sequelizeInstance.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
		role: {
			type: DataTypes.ENUM(['admin', 'customer']),
			allowNull: false,
		}
  });
}


export default User;
