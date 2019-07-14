import jwt from 'jsonwebtoken';
import Encryptor from '../helper/encryptor';
import Query from '../model/Query';

const users = new Query('users');
/**
 *@description Authentication of user details on registering and login
 */

class Authentication {
    /**
     * @description User signup for route
     * @param { Object } request 
     * @param { Object } response
     * @return { JSON } return  
     */

    static async signup (request, response){
        try {
            const {email, password, first_name, last_name, is_admin } = request.body;
            const checkEmail = await users.select(['email'], [`email='${email}'`]);
            if(checkEmail.length>0){
                return response.status(409).json({
                    status: 409,
                    error: 'Email already in use'
                })
            }
            const encrytedPassword = Encryptor.encrypt(password);
            const userData ={ 
                first_name,
                last_name, 
                email, 
                password: encrytedPassword, 
                is_admin 
            };
            const result = await users.insert(Object.keys(userData),[`'${first_name}', '${last_name}', '${email}', '${encrytedPassword}', '${is_admin}'`]);
            const data = { 
                id: result[0].id,
                first_name: result[0].first_name,
                last_name: result[0].last_name,
                email: result[0].email, 
                is_admin: result[0].is_admin
            };
            const token = jwt.sign(data, process.env.JWT_SECRET);
            return response.status(201).json({
                status: 201,
                data,
                token
            })
        } catch (error) {
            return response.status(503).json({
                status: 503,
                error: 'Something went wrong, service not available'
            });
        }
       
    }
     /**
     * @description login user 
     * @param { Object } request 
     * @param { Object } response
     * @return { JSON } return  
     */
    static async login (request, response){
        try {
            const checkUser = await users.select(['*'],`email='${request.body.email}'`);
            if(!checkUser[0]){
                return response.status(401).json({
                    status: 401,
                    error: 'Incorrect email address'
                })
            }
            const checkPassword = Encryptor.compare(request.body.password, checkUser[0].password);
            if(!checkPassword){
                return response.status(401).json({
                    status: 401,
                    error: "Incorrect Password"
                })
            }
            const { password, ...data } = checkUser[0];
            const token = jwt.sign(data, process.env.JWT_SECRET);
            return response.status(200).json({
                status: 200,
                data,
                token
            })
        } catch (error) {
            return response.status(503).json({
                status: 503,
                error: 'Something went wrong, service not available'
            });
        }
        

    }

}

export default Authentication;