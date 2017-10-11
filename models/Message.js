var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./Users');

var MessageSchema  = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

MessageSchema.post('remove', (message)=>{
    User.findById(message.user, (err, user)=>{
        user.messages.pull(message);
        user.save();
    });
});

module.exports = mongoose.model('Message', MessageSchema);
