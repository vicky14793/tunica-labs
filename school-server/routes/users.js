var express = require('express');
var router = express.Router();
const knex = require('./../db/knex.js');
const bcrypt = require("bcrypt");
/* GET home page. */
router.post('/', function(req, res, next) {

  bcrypt.hash(req.body.password, 10, (err, hash)=>{
    if(err){
      return res.status(500).send({error: "Error in Registration"})
    }

  console.log(req.body)
  let fullname = req.body.fullname;
  let email = req.body.email;
  let password = hash;
  let phone = req.body.phone;

  console.log(password)
  let users_obj = {
    fullname,
    email,
    password,
    phone
  }
  knex('users')
    .insert(users_obj)
    .returning('*')
    .then(
      response =>  {
        return res.status(200).send('User details have been created')
      }
    )
    .catch(
      error =>  {
        return res.status(400).send({
          message: 'Got error while saving user\'s detail',
          data: error
        })
      }
    )
})
});



router.post('/signin', async function(req, res, next) {
  const email = req.body.email.trim().toString();
    const password = req.body.password.trim().toString();

    try {
      let user = await knex('users').where('email', email).first();
      if (!user) {
        return res.status(404).send('This email does not exists',  );
      }
      bcrypt.compare(password, user.password, function(err, result){
           if(err) {
             return res.status(401).json({
                error: 'Unauthorized Access'});
           }
           if (result) {
             return res.status(200).send({
               message: 'User loggedin',
               data: user.fullname})
           }
           else {
             return res.status(500).send(
               'Password did not match'
             )
           }
        });
    }
    catch(err) {
      res.status(500).json({
         success: 'Something went wrong.'
      });
    }
});
module.exports = router;
