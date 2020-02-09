var express = require('express');
var router = express.Router();
const knex = require('./../db/knex.js');

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body)
  let name = req.body.name;
  let school = req.body.school;
  let sclass = req.body.sclass;
  let division = req.body.division;
  let dob = req.body.dob;
  let status = Boolean(req.body.status === 'true' ? true : false);


  if (!name) {
      return res.status(400).send('error in form data -name is required ')
  }

  if (name.length > 500) {
    return res.status(400).send('error in form data -more than enough characters')
  }

  if (Number(name)) {
    return res.status(400).send('error in form data - should be characters')
  }

  if (!school) {
      return res.status(400).send('error in form data -school is required ')
  }

  let arr = ['Eden High School', 'GIC High School'];
  console.log(school)
  let indexIs  = arr.indexOf(school);
  console.log(indexIs);
  if (indexIs < 0) {
      return res.status(400).send('error in form data -School does not exist ')
  }


  let student_obj = {
    name,
    school,
    sclass,
    division,
    dob,
    status
  }
  knex('students')
    .insert(student_obj)
    .returning('*')
    .then(
      response =>  {
        return res.status(200).send('Student details have been created')
      }
    ).catch(
      error =>  {
        return res.status(400).send({
          message: 'Got error while saving student\'s detail',
          data: error
        })
      }
    )

});

router.get('/:id', function(req, res, next) {
  let id = req.params.id;

  knex('students')
    .where('id', id)
    .returning('*')
    .then(
      response =>  {
        console.log(response)
        return res.status(200).send({
          message: 'Student details have been fetched by id',
          data: response
        })
      }
    ).catch(
      error =>  {
        return res.status(400).send({
          message: 'Got error while fetching student\'s detail',
          data: error
        })
      }
    )

});

router.delete('/:id', function(req, res, next) {
  let id = req.params.id;

  knex('students')
    .where({id: id})
    .del()
    .then(
      response =>  {
        return res.status(200).send({
          message: 'Student has been deleted by id',
          data: response
        })
      }
    ).catch(
      error =>  {
        return res.status(400).send({
          message: 'Got error while deleting student\'s detail',
          data: error
        })
      }
    )

});


router.put('/:id', function(req, res, next) {
  let id = req.params.id;
  let name = req.body.name;
  let school = req.body.school;
  let sclass = req.body.sclass;
  let division = req.body.division;
  let dob = req.body.dob;
  let status = req.body.status;


  let student_obj = {
    name,
    school,
    sclass,
    division,
    dob,
    status
  }
  knex('students')
    .update(student_obj)
    .where('id', id)
    .returning('*')
    .then(
      response =>  {
        console.log(response)
        return res.status(200).send({
          message: 'Student details have been updated',
          data: response
        })
      }
    ).catch(
      error =>  {
        return res.status(400).send({
          message: 'Got error while updating student\'s detail',
          data: error
        })
      }
    )

});


router.get('/', (req, res) => {
  knex('students')
    .returning('*')
    .then(
      response =>  {
        console.log(response)
        return res.status(200).send({
          message: 'Student details have been updated',
          data: response
        }
    )
    .catch(
      error =>  {
        console.log(error)
        message: 'Got error while updating student\'s detail'
      //  data: error
      }
    )
    })
});

module.exports = router;
