import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { isNil, toString } from 'lodash';

export default class AuthenticationController {
    constructor(UserModel, SECRET) {
        this.UserModel = UserModel;
        this.SECRET = SECRET
    }

    /**
     * 
     * @param {string} username 
     * @returns {object} token, userInfo
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
