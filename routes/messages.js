var express = require('express');
var router = express.Router();
var Message = require('../models/Message');

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

router.post('/', (req, res, next)=>{
    var msg = req.body;
    var message = new Message({
        content: msg.content
    });
    message.save((err, response)=>{
        if(err) {
            return res.status(500).json({
                title: 'there was a error saving',
                error: err
            });
        }
        res.status(201).json({
            message: 'saved message',
            obj: response
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
