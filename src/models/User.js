import { DataTypes } from 'sequelize';
import sequelizeInstance from '../dbConfig';


const User = sequelizeInstance.define('User', {
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

export default User;
