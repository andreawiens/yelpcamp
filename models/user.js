const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
//Adds on a username and password to the schema.
//It checks that username is unique.
//It also adds some methods to the schema.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);