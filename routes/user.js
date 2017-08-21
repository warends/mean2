var express = require('express');
var router = express.Router();
var User = require('../models/Users');
var byscrpt = require('bcryptjs')

router.post('/', function (req, res, next) {
    var user = req.body;
    var user = new User({
        fisrtName: user.fisrtName,
        lastName: user.lastName,
        password: bcrypt.hashSync(user.password, 10),
        email: user.email
    });
    user.save(function(err, res){
        if(err){
            return res.status(500).json({
                title: 'an error occured',
                error: err
            })
        }
        res.status(201).json({
            message: 'user created',
            obj: res
        });
    });
    res.redirect('/');
});


module.exports = router;
