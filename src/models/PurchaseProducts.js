import { DataTypes } from "sequelize";

const PurchaseProducts = (sequelizeInstance, purchaseInstance, productInstance) => 
  sequelizeInstance.define('PurchaseProducts', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
});


export default PurchaseProducts;