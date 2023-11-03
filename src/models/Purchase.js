import { DataTypes } from 'sequelize';
import User from './User';

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



// Purchase.belongsToMany(Product, { through: PurchaseProducts });
// Product.belongsToMany(Purchase, { through: PurchaseProducts });

export default Purchase;