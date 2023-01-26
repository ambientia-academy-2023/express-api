const express = require('express');
const router = express.Router();
const user = require('../models/user_model');

router.get('/',
    function (request, response) {
        user.getAll(function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                console.log(dbResult);
                response.json(dbResult);
            }
        })
    });

router.get('/:id',
    function (request, response) {
        user.getById(request.params.id, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
              console.log(dbResult[0]);
              //palautetaan objekti eli eka alkio
                response.json(dbResult[0]);
            }
        })
    });


router.post('/', 
function(request, response) {
  user.add(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult.affectedRows);
      console.log(dbResult);
    }
  });
});


router.delete('/:id', 
function(request, response) {
  user.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
      console.log(dbResult);
    }
  });
});


router.put('/:id', 
function(request, response) {
  user.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      console.log(dbResult);
      response.json(dbResult.affectedRows);
    }
  });
});

module.exports = router;
