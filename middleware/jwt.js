'use strict';

var jwt = require('jsonwebtoken');

function jwtCreate(userData){
  return new Promise(function (resolve, rejcet) {
      jwt.sign({
        user_id: userData.user_id,
        user_name_ko: userData.user_name_ko,
        user_email: userData.user_email
      }, process.env.JWT_SECRET, {
        expiresIn: '30m',
        issuer: 'Conative',
      },function(err,token){
        if(err) reject(err)
        else resolve(token)
      });
  })
}

function jwtCerti(token){
  return new Promise(function (resolve, rejcet) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
          console.log("JWT was Expired!")
        }
        if(decoded){
          resolve(decoded);
        }
        else{
          resolve(false);
        }
      });
  })
}

module.exports.jwtModule = {
  jwtCreate,
  jwtCerti
};