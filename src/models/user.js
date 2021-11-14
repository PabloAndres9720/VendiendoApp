const {Schema, model} =require('mongoose');
const bcryp = require('bcryptjs');

const UserSchema = new Schema({
    name:{type: String, required:true},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true}
},{
    timestamps: true
});

UserSchema.methods.encryptPassword = async password =>{
    const salt = await bcryp.genSalt(10);
    return await bcryp.hash(password,salt);
}

UserSchema.methods.matchPassword = async function(password) {
    return await bcryp.compare(password,this.password);
}

module.exports = model('User',UserSchema);