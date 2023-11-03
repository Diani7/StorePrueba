import bcrypt from 'bcrypt';
import { omit } from "lodash";

export default class UsersController {
    constructor(UserModel) {
        this.UserModel = UserModel;
        this.users = [];
    }
     

    async getUsers() {
        this.users = await this.UserModel.findAll();
        return this.users;
    }

    async createUser(userBody) {
        const passwordHash = await bcrypt.hash(userBody.password, 10);

        const createdUser = await this.UserModel.create({ ...userBody, password: passwordHash });

        return omit(createdUser.dataValues, ['password']);
    }
}
