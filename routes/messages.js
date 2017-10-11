var express = require('express');
var router = express.Router();
var Message = require('../models/Message');
var jwt = require('jsonwebtoken');
var User = require('../models/Users'); 

router.get('/', (req, res, next)=>{
    var messages = Message.find()
        .exec((err, messages) => {
            if(err){
                return res.status(500).json({
                    title: 'there was a error getting messages',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            });
        });

});

router.use('/', (req, res, next) => {
    jwt.verify(req.query.token, 'secret', (err, decoded)=>{
        if(err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    });
});

router.post('/', (req, res, next)=>{
    var msg = req.body;
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user_id, (err, user) =>{
        if(err) {
            return res.status(500).json({
                title: 'an error occured',
                error: err
            });
        }
        var message = new Message({
            content: msg.content,
            user: user
        });
        message.save((err, message)=>{
            if(err) {
                return res.status(500).json({
                    title: 'there was a error saving',
                    error: err
                });
            }
            user.messages.push(message);
            user.save();
            res.status(201).json({
                message: 'saved message',
                obj: message
            });
        });
    });
});

router.patch('/:id', (req, res, next)=>{
    Message.findById(req.params.id, (err, message)=>{
        if(err) {
            return res.status(500).json({
                title: 'an error occured',
                error: err
            });
        }
        if(!message){
            return res.status(500).json({
                title: 'no message found',
                error: {message: 'Message not found'}
            });
        }
        message.content = req.body.content;
        message.save((err, response)=>{
            if(err) {
                return res.status(500).json({
                    title: 'there was a error saving',
                    error: err
                });
            }
            res.status(200).json({
                message: 'updated message',
                obj: response
            });
        });
    });
});

router.delete('/:id', (req, res, next)=>{
    Message.findById(req.params.id, (err, message)=>{
        if(err) {
            return res.status(500).json({
                title: 'an error occured',
                error: err
            });
        }
        message.remove((err, response)=>{
            res.status(200).json({
                message: 'deleted message',
                obj: response
            });
        });
    });
});



module.exports = router;
