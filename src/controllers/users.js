/**
 * Controlador de usuarios que maneja las operaciones CRUD para usuarios.
 */
import bcrypt from 'bcrypt';
import { omit } from "lodash";

export default class UsersController {
    /**
     * Inicializa el controlador de usuarios con el modelo de usuario.
     * @param {Model} UserModel - El modelo de Sequelize para usuarios.
     */
    constructor(UserModel) {
        this.UserModel = UserModel;
        this.users = [];
    }
     
    /**
     * Obtiene todos los usuarios de la base de datos.
     * @returns {Promise<Array>} Una lista de usuarios.
     */
    async getUsers() {
        this.users = await this.UserModel.findAll();
        return this.users;
    }
    /**
     * Crea un nuevo usuario en la base de datos.
     * @param {object} userBody - El cuerpo de la solicitud con los datos del usuario.
     * @returns {Promise<object>} El usuario creado sin la contraseña.
     */
    async createUser(userBody) {
        const passwordHash = await bcrypt.hash(userBody.password, 10);

        const createdUser = await this.UserModel.create({ ...userBody, password: passwordHash });

        return omit(createdUser.dataValues, ['password']);
    }
}
