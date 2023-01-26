const express = require('express');
const router = express.Router();
const book = require('../models/book_model');

router.get('/',
    function (request, response) {
        book.getAll(function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                console.log(dbResult);
                response.json(dbResult);
            }
        })
    });

router.get('/:id?',
    function (request, response) {
        book.getById(request.params.id, function (err, dbResult) {
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
  book.add(request.body, function(err, dbResult) {
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
  book.delete(request.params.id, function(err, dbResult) {
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
  book.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      console.log(dbResult);
      response.json(dbResult.affectedRows);
    }
  });
});

module.exports = router;
