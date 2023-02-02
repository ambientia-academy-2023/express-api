const express = require('express');
const router = express.Router();
const user = require('../models/user_model');
var path = require('path');

const filePath = path.join(__dirname, '../public/images/');
const multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath)
  },
  filename: function (req, file, cb) {

      cb(null,  file.originalname );

  }
});

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


    const upload = multer({ storage: storage})

    router.post('/',upload.single('file'),
    function(request, response) {
      console.log(request.file.filename);
      user.add(request.body, request.file.filename, function(err, count) {
        if (err) {
          response.json(err);
        } else {
          response.json(request.body); 
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
