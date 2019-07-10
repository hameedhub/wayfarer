class TokenAccess{

    static adminAccess(request, response, next){
        if(request.userData.is_admin !== true){
            return response.status(401).json({
                status: 401,
                error: 'Only Admin are allowed to access this route'
            })
        }
        next();
    }
    static clientAccess(request, response, next){
        if(request.userData.is_admin != false){
            return response.status(401).json({
                status: 401,
                error: 'Only client are allowed to access this route'
            })
        }
        next();
    }
}

export default TokenAccess;