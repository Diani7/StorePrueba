import { DataTypes } from 'sequelize';
import sequelizeInstance from '../dbConfig';


const Product = sequelizeInstance.define('Product', {
    lote: {
        type: DataTypes.INTEGER,
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
});

export default Product;