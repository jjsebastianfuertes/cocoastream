var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jsonToken = require('jsonwebtoken');
var secret = require('../config').secret;

const regexUser = /^[a-zA-Z0-9]+$/;
const regexPass = /\S+@\S+\.\S+/;
var userSchema = mongoose.Schema({
   name: {type: String, lowecase: true, unique: true, required: [true, "no se puede dejar vacio"], match: [regexUser, 'no es valido'], index: true},
   email: {type: String, lowecase: true, unique: true, required: [true, "no se puede dejar vacio"], match: [regexPass, 'no es valido'], index: true},
   hash: String,
   salt: String
}, {timestamps: true});

userSchema.plugin(uniqueValidator, {message: 'ya está tomado'});

userSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validPassword = (password) => {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJWT = () => {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate()+60);

    return jsonToken.sign({
        id: this._id,
        name: this.name,
        exp: parseInt(exp.getTime()/1000)
    }, secret);
};

userSchema.methods.toAuthJSON = () =>{
    return {
        name: this.name,
        email: this.email,
        token: this.generateJWT()
    };
};

mongoose.model('user', userSchema);