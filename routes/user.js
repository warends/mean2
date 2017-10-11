var express = require('express');
var router = express.Router();
var User = require('../models/Users');
var bycrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
    var user = req.body;
    var user = new User({
        email: user.email,
        password: bycrypt.hashSync(user.password, 10),
        firstName: user.firstName,
        lastName: user.lastName
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

router.post('/signin', (req, res, next) =>{
    console.log(req.body);
    User.findOne({email: req.body.email}, (err, user) => {
        if(err){
            return res.status(500).json({
                title: 'an error occured',
                error: err
            });
        }
        if(!user){
            return res.status(401).json({
                title: 'Login Failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if(!bycrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'Login Failed',
                error: {message: 'Invalid Password'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'successful login',
            token: token,
            userId: user._id
        });
    });
})


module.exports = router;
