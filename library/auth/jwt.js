var jwt = require('jsonwebtoken');
const config = require('config');
const jwt_config = config.get('jwtConfig');

let generateToken = (profile) =>{
  //console.log(profile,'------>');
  return new Promise( (resolve, reject) => {
    jwt.sign(profile,jwt_config.secretKey,{ expiresIn:jwt_config.expiresIn }, function(err, token) {
      //console.log(err,'err------>',token);
      resolve(token);
    })
  })
}

let verifyToken = (token) =>{
  return new Promise( (resolve, reject) => {
    jwt.verify(token,jwt_config.secretKey,{ expiresIn:jwt_config.expiresIn },(err, decoded)=> {
      resolve(decoded);
    });
  })
}

let validateToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if(token && token.length>0){
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    if (token) {
      jwt.verify(token, jwt_config.secretKey, (err, decoded) => {
        if (err) {
          //console.log(err,'err----->token');
          return res.json({status:401,message: 'Token is not valid'});
        } else {
          //console.log(decoded,'---decoded')
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({status:401,message: 'Auth token is not supplied'});
    }
  }else {
    return res.json({status:401,message: 'Token missing'});
  }
};

module.exports={generateToken,verifyToken,validateToken};
