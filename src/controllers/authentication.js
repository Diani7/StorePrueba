import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { isNil, toString } from 'lodash';

/**
 * Controlador de autenticación que maneja la autenticación y verificación de usuarios.
 */
export default class AuthenticationController {
    /**
    * Se inicializa el controlador de autenticación con el modelo de usuario y el secreto para JWT.
    * @param {Model} UserModel - El modelo de Sequelize para usuarios.
    * @param {string} SECRET - La clave secreta para firmar el token JWT.
    */
    constructor(UserModel, SECRET) {
        this.UserModel = UserModel;
        this.SECRET = SECRET
    }

/**
     * Autentica a un usuario y devuelve un token JWT si las credenciales son válidas.
     * @param {object} credentials - Las credenciales del usuario, que contienen username y password.
     * @returns {Promise<object|null>} Un objeto con el token y la información del usuario o null si la autenticación falla.
     */
    async authenticate({ username, password }) {

        const user = await this.UserModel.findOne({
            where: { username },
        });

        const getPasswordHash = () => !isNil(user) ? user.password : '';

        const passwordMatch = await bcrypt.compare(toString(password), getPasswordHash());

        if(!isNil(user) && passwordMatch) {
            const userInfo = { user_id: user.id, role: user.role };

            const token = jwt.sign(
                userInfo,
                this.SECRET,
                { expiresIn: '7d' }
            );

            return { token, ...userInfo };

        }

        return null;
    }


    /**
     * Verifica el token JWT proporcionado y devuelve los datos del usuario si el token es válido.
     * @param {string} bearerToken - El token JWT con el prefijo 'Bearer '.
     * @returns {Promise<object>} Un objeto con los datos decodificados del usuario o un objeto de error.
     */
    async verifyLogin(bearerToken) {
        const token = bearerToken.substr(7, bearerToken.length);
        
        try {
            const decoded = jwt.verify(
                token,
                this.SECRET,
            );
            return { ...decoded }

        } catch (error) {
            console.error('fuck this shit', error)
            return { error };
        }
    }
}
