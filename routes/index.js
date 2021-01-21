var jwtmiddle = require('../middleware/jwt');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  
  let token = req.cookies.user;
  jwtmiddle.jwtModule.jwtCerti(token).then(
    (is_ok)=>{
      console.log(is_ok);
    }
  ).catch(err=>res.send("<script>alert('jwt err');</script>"));
  

  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.render('test');
})

module.exports = router;