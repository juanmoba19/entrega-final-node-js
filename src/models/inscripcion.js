const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const inscripcionSchema = new Schema({
    id: {
        type: Number,
        required : true
    },
    email: {
        type : String,
		required : true,
		trim : true
    },
    nombre: {
        type : String,
        required : true,
        trim : true
    },
    telefono: {
        type : Number,
		required : true
    },
    curso: {
        type : Number,
        required : true
    }
});

inscripcionSchema.plugin(uniqueValidator);

const Inscripcion = mongoose.model('Inscripcion', inscripcionSchema);

module.exports = Inscripcion