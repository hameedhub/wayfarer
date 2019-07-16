import jwt from 'jsonwebtoken';
class Token{
    static checkToken (request, response, next){
        try {
           const token = request.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            request.userData = decoded; 
            next();
        } catch (error) {
            return response.status(401).json({
                status: 401,
                error: `Authorization failed, Please Login`
            })
            
        }
    }
}


export default Token;