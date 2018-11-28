var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jsonToken = require('jsonwebtoken');


const regexUser = /^[a-zA-Z0-9]+$/;
const regexPass = /\S+@\S+\.\S+/;

const Categorias = Object.freeze({
    Cine: 'cine',
    Tv: 'tv',
    Animacion: 'animacion'
});
var userSchema = mongoose.Schema({
   name: {type: String, lowecase: true, unique: true, required: [true, "no se puede dejar vacio"],/* match: [regexUser, 'no es valido'],*/ index: true},
   email: {type: String, lowecase: true, unique: true, required: [true, "no se puede dejar vacio"], match: [regexPass, 'no es valido'], index: true},
   categoria: {type: String, enum: Object.values(Categorias)},
   hash: String,
   salt: String
}, {timestamps: true});

userSchema.plugin(uniqueValidator, {message: 'ya está tomado'});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
    console.log("Si trato de poner la clave "+password);
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJWT = () => {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate()+60);

    return jsonToken.sign({
        id: this._id,
        email: this.email,
        categoria: this.categoria,
        name: this.name,
        exp: parseInt(exp.getTime()/1000)
    }, process.env.JWT_SECRET);
};

userSchema.methods.toAuthJSON = () =>{
    return {
        name: this.name,
        email: this.email,
        token: this.generateJWT()
    };
};

mongoose.model('user', userSchema);