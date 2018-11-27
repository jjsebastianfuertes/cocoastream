var mongoose = require('mongoose');
var creditoSchema = new mongoose.Schema({
    creador:  {type: String, default: null},
    director: String,
    productor:String,
    cast: [String]
});

const Tipos = Object.freeze({
    Peli: 'peli',
    Serie: 'serie'
});

const Categorias = Object.freeze({
    Cine: 'cine',
    Tv: 'tv',
    Animacion: 'animacion'
});
var videoSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    thumbnail: {type: String, required: true},
    pathUrl: {type: String, required: true},
    tipo: {type: String, enum: Object.values(Tipos)},
    categoria: {type: String, enum: Object.values(Categorias)},
    genero: [String],
    nombreSerie: {type: String, default: null},
    temporadaSerie: {type: String, default: null},
    descripcion: {type: String, required:true},
    creditos: creditoSchema

});

mongoose.model('video', videoSchema);