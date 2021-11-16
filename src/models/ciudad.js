const { Schema, model} = require('mongoose');

const CiudadSchema = new Schema({

    ciudad: {
        type:String,
        required: true
    }},{
    timestamps: true
})


module.exports = model('Ciudad',CiudadSchema);

