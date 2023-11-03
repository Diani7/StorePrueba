/**
 * Controlador de productos que maneja las operaciones CRUD para productos.
 */
export default class ProductsController {
    /**
     * Inicializa el controlador de productos con el modelo de producto.
     * @param {Model} ProductModel - El modelo de Sequelize para productos.
     */
    constructor(ProductModel) {
        this.ProductModel = ProductModel;
        this.products = [];
    }

    /**
     * Obtiene todos los productos de la base de datos.
     * @returns {Promise<Array>} Una lista de productos.
     */
    async getProducts() {
        this.products = await this.ProductModel.findAll();
        return this.products;
    }
    /**
     * Crea un nuevo producto en la base de datos.
     * @param {object} productBody - El cuerpo de la solicitud con los datos del producto.
     * @returns {Promise<object>} El producto creado.
     */
    async createProduct(productBody) {
        const createdProduct = await this.ProductModel.create({ ...productBody });
        return createdProduct;
    }
     /**
     * Elimina un producto de la base de datos.
     * @param {number} id - El ID del producto a eliminar.
     * @returns {Promise<number>} El número de productos eliminados.
     */
    async deleteProduct(id) {

        const deletedProduct = await this.ProductModel.destroy({
            where: {
                id
              }
        });

        return deletedProduct;
    }
    /**
     * Actualiza un producto en la base de datos.
     * @param {number} id - El ID del producto a actualizar.
     * @param {object} productBody - El cuerpo de la solicitud con los datos del producto actualizados.
     * @returns {Promise<object>} El producto actualizado.
     */
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
