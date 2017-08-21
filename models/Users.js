var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Validator = require('mongoose-unique-validator');

var UserSchema  = new Schema({
    fisrtName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

UserSchema.plugin(Validator);

module.exports = mongoose.model('User', UserSchema);


