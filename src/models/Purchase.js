import { DataTypes } from 'sequelize';
import sequelizeInstance from '../dbConfig';
import Product from './Product';

const Purchase = sequelizeInstance.define('Purchase', {
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalProducts: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

const PurchaseProducts = sequelize.define('PurchaseProducts', {
  PurchaseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Purchase,
      key: 'id'
    }
  },
  ProductId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Purchase.belongsToMany(Product, { through: PurchaseProducts });
Product.belongsToMany(Purchase, { through: PurchaseProducts });

export default Purchase;
