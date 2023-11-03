
export default class ProductsController {
    constructor(ProductModel) {
        this.ProductModel = ProductModel;
        this.products = [];
    }

    async getProducts() {
        this.products = await this.ProductModel.findAll();
        return this.products;
    }

    async createProduct(productBody) {
        const createdProduct = await this.ProductModel.create({ ...productBody });
        return createdProduct;
    }

    async deleteProduct(id) {

        const deletedProduct = await this.ProductModel.destroy({
            where: {
                id
              }
        });

        return deletedProduct;
    }

    async updateProduct(id, productBody) {
        console.log('id, body', id, productBody)

        const updatedproduct = await this.ProductModel.update(productBody, {
            where: {
                id
            }
        })

        return updatedproduct;
    }
}
