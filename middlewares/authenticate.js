const jwt = require('jsonwebtoken');
const validationToken = require('../errors/error/5-validationToken');
const validationPermission = require('../errors/error/9-validationPermission');
const secretKey = 'asdfqwerzxcv'; //// Chave secreta para descriptaro JWT
const UserObj = require('../src/users/UsersObject');

// async function verifyStatus(obj, idUser){
//     return obj.Search.Id(idUser);
// }

module.exports = (req, res, next) => {
    const authToken = req.headers['x-access-token'];

    if(authToken != undefined){
        jwt.verify(authToken, secretKey, async (err, data) => {
            if(err){
                try {
                    throw new validationToken();
                } catch (e) {
                    next(e);
                }
            } else{
                const user = new UserObj();
                let permission = user.Validation.UserPermissions(data.UserType);
                let result = await user.Search.Id(data.idUser);
                if(!result.status){
                    try {
                        throw new validationPermission();
                    } catch (e) {
                        next(e);
                    }
                }
                req.token = authToken;
                req.loggedUser = {
                    idUser: data.idUser,
                    email: data.email,
                    Username: data.UserName,
                    UserPhoto: data.UserPhoto,
                    permissions: permission
                };
                if(req.url.toUpperCase() === '/validate'.toUpperCase()){
                    next();
                } else{

                    let verbo = undefined;
                    for(let method of permission.backend){
                        if(method.type.toUpperCase() === req.method.toUpperCase()){
                            verbo = method;
                            break;
                        }
                    }

                    if(verbo){
                        let route = verbo.route.find(route => route.toUpperCase() === req.route.path.toUpperCase());

                        if(route){
                            next();
                        } else{
                            try {
                                throw new validationPermission();
                            } catch (e) {
                                next(e);
                            }
                        }
                    } else{
                        try {
                            throw new validationPermission();
                        } catch (e) {
                            next(e);
                        }
                    }
                }

                // next();
            }
        })
        
    } else {
        try {
            throw new validationToken();
        } catch (e) {
            next(e);
        }
    }
}