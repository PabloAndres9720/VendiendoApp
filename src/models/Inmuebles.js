const { Schema, model} = require('mongoose');

const InmuebleSchema = new Schema({

    tipo: {
        type:String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    zona:{
        type: String,
        required:true
    },
    precio:{
        type: String,
        required:true
    },
    foto:{
        type: String,
        required:false
    },
    habitaciones:{
        type: Number,
        required:true
    },
    user:{
        type: String,
        required: true
    }
    

},{
    timestamps: true
})


module.exports = model('Inmueble',InmuebleSchema);

