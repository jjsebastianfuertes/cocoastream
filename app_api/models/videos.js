var mongoose = require('mongoose');
var creditoSchema = new mongoose.Schema({
    creador: String,
    director: String,
    productor:String,
    cast: [String]
});
var videoSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    thumbnail: {type: String, required: true},
    pathUrl: {type: String, required: true},
    tipo: {enum: ["peli", "serie"]},
    categoria: {enum: ["cine", "tv", "animacion"]},
    genero: [String],
    nombreSerie: {type: String, default: null},
    temporadaSerie: {type: String, default: null},
    creditos: creditoSchema

});

mongoose.model('video', videoSchema);