var mongoose = require('mongoose');

var peliculasSchema = mongoose.Schema({
    generos:{
        accion: String,
        anime: String,
        drama: String,
        romance: String,
        

    }
})

var peliculas = mongoose.model('peliculas', peliculasSchema);
module.exports = peliculas;