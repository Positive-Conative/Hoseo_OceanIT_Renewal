'use strict';

var jwt = require('jsonwebtoken');

function jwtCerti(token){
  return new Promise(function (resolve, rejcet) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
          console.log("JWT ERR!")
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
  jwtCerti
};