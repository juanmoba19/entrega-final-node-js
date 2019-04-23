const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
    documento: {
        type: Number,
        required : true,
        unique: true
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
    tipo: {
        type: String,
        default: 'aspirante' 
    },
    password :{
		type : String,
		required : true
    },
    avatar: {
        type: Buffer
    }
});

usuarioSchema.plugin(uniqueValidator);

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario