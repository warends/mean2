var express = require('express');
var router = express.Router();
var User = require('../models/Users');
var bycrypt = require('bcryptjs');

router.post('/', function (req, res, next) {
    var user = req.body;
    var user = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        password: bycrypt.hashSync(user.password, 10),
        email: user.email
    });
    user.save(function(err, user){
        if(err){
            return res.status(500).json({
                title: 'an error occured',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: user
        });
    });
    // res.redirect('/');
});


module.exports = router;
