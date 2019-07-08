import jwt from 'jsonwebtoken';
import Encryptor from '../helper/encryptor';
import users from '../database/persistentData/users.json';
/**
 *@description Authentication of user details on registering and login
 */

class Authentication {
    /**
     * @description User signup for route
     * @param { Object } request 
     * @param { Object } response
     * @return { Object } return  
     */

    static signup (request, response){
        const {email, password, first_name, last_name, isAdmin } = request.body;
        const encrytedPassword = Encryptor.encrypt(password);
        const data ={
            id :users.length +1,
            email, password: encrytedPassword, first_name, last_name, is_admin: false
        }
            users.push(data);
        const token = jwt.sign(data, process.env.JWT_SECRET);
        return response.status(201).json({
            status: 201,
            data,
                token
        })
    }
    static login (request, response){
        const checkUser = users.find((user)=> user.email === request.body.email);
        if(!checkUser){
            return response.status(401).json({
                status: 401,
                error: 'Incorrect email address'
            })
        }
        const checkPassowrd = Encryptor.compare(request.body.password, checkUser.password);
        if(!checkPassowrd){
            return response.status(401).json({
                status: 401,
                error: "Incorrect Password"
            })
        }
        const { password, ...data } = checkUser;
        const token = jwt.sign(checkUser, process.env.JWT_SECRET);
        return response.status(200).json({
            status: 200,
            data,
            token
        })

    }

}

export default Authentication;