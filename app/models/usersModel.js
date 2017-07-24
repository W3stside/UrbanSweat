var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//validator
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var userSchema = new Schema({
    first_name: {
        type: String,
        required: true,

        min: [1, 'First name must be at least 1 letter'],
    },
    last_name: {
        type: String,
        required: true,

        min: [1, 'Last name must be at least 1 letter'],
    },
    email: {
        type: String,
        required: true,

        lowercase: true,
        min: [1, 'Please enter a valid email address'],
        max: [90, 'Please enter a valid email address shorter than 90 characters'],
        trim: true,
        unique: true,

        validate: [validateEmail, 'Please enter a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    username: {
        type: String,
        required: true,

        min: [1, 'Username must be at least 1 character'],
        trim: true
    },
    password: {
        type: String,
        required: true,

        min: [8, 'Password must be at least 8 characters']
    },
});

//PW validator
userSchema.methods.validPassword = function(pw) {
    return (this.password === pw);
}

module.exports = mongoose.model('User', userSchema);
