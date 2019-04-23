const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const cursoSchema = new Schema({
    id: {
        type: Number,
        required : true,
        unique: true
    },
    nombre: {
        type : String,
		required : true,
		trim : true
    },
    descripcion: {
        type : String,
		required : true
    },
    valor: {
        type : Number,
		required : true
    },
    modalidad: {
        type : String,
        required : false,
    },
    intensidad: {
        type : String,
        required : false,
    },
    estado: {
        type : String,
        default: 'Disponible',
        required : false
    }
});

cursoSchema.plugin(uniqueValidator);

const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso