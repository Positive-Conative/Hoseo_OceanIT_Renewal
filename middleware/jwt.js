var jwt = require('jsonwebtoken');

function jwtCerti(token){
  return new Promise(function (resolve, rejcet) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
          console.log("JWT ERR!")
        }
        if(decoded){
          console.log("권한이 있어서 API 수행 가능")
          resolve("YES!!");
        }
        else{
          console.log("권한이 없습니다.")
          resolve("No!!");
        }
      });
  })
    
}
module.exports.jwtModule = {
  jwtCerti
};