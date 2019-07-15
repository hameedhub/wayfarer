import jwt from 'jsonwebtoken';
import Encryptor from '../helper/encryptor';
import Query from '../model/Query';
import { isEmpty } from '../validation/Authentication';

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
            let {email, password, first_name, last_name } = request.body;
            const checkEmail = await users.select(['email'], [`email='${email}'`]);
            if(checkEmail.length>0){
                return response.status(409).json({
                    status: 409,
                    error: 'Email already in use'
                })
            }
            let is_admin;
            if(request.body.is_admin){
                is_admin = request.body.is_admin
            }else{
                is_admin = false
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
            const dataResult = { 
                id: result[0].id,
                first_name: result[0].first_name,
                last_name: result[0].last_name,
                email: result[0].email, 
                is_admin: result[0].is_admin
            };
            const token = jwt.sign(dataResult, process.env.JWT_SECRET);
            const data = { ...dataResult, token};
            return response.status(201).json({
                status: 201,
                data
            })
        } catch (error) {
            console.log(error);
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
            const result = await users.select(['*'],`email='${request.body.email}'`);
            if(!result[0]){
                return response.status(401).json({
                    status: 401,
                    error: 'Incorrect email address'
                })
            }
            const checkPassword = Encryptor.compare(request.body.password, result[0].password);
            if(!checkPassword){
                return response.status(401).json({
                    status: 401,
                    error: "Incorrect Password"
                })
            }
            const dataResult = { 
                id: result[0].id,
                first_name: result[0].first_name,
                last_name: result[0].last_name,
                email: result[0].email, 
                is_admin: result[0].is_admin
            };
            const token = jwt.sign(dataResult, process.env.JWT_SECRET);
            const data = { ...dataResult, token};
            return response.status(200).json({
                status: 200,
                data
            })
        } catch (error) {
            console.log(error);
        }
        

    }

}

export default Authentication;