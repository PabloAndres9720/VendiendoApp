const inmueblesCtrl ={};
const Inmueble = require('../models/Inmuebles');
const cloudinary =require('cloudinary');

inmueblesCtrl.renderInmuebleForm = (req,res) =>{
    res.render('inmuebles/new-inmueble');
}

inmueblesCtrl.createNewInmueble = async (req,res) => {
    console.log(req.body);
    console.log(req.file);
    const cloudinary =require('cloudinary');
    cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
    })

    const fs =require('fs-extra');
    
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(result);

    const {tipo,descripcion,zona,precio,habitaciones} =req.body;
    const newInmueble = new Inmueble({tipo,descripcion,zona,precio,habitaciones});
    newInmueble.foto =result.url;
    newInmueble.user = req.user.id;
    await newInmueble.save();
    await fs.unlink(req.file.path);
    req.flash('success_msg','Inmueble Adicionado Correctamente');
    res.redirect('/inmuebles');
}

inmueblesCtrl.renderInmuebles = async (req,res) =>{
    const inmuebles = await Inmueble.find({user: req.user.id}).sort({createdAt: 'desc'}).lean();
    res.render('inmuebles/all-inmuebles',{inmuebles});
}

inmueblesCtrl.renderEditForm= async(req,res) =>{
    const inmueble = await Inmueble.findById(req.params.id).lean();
    if(inmueble.user !=req.user.id)
    {
        req.flash('error_msg','No autorizado');
        return res.redirect('/inmuebles');
    }
    res.render('inmuebles/edit-inmueble',{inmueble})
}

inmueblesCtrl.updateInmueble = async (req,res) =>{
    const {tipo,descripcion,zona,precio,imagen1,imagen2,habitaciones} = req.body
    await Inmueble.findByIdAndUpdate(req.params.id,{tipo,descripcion,zona,precio,imagen1,imagen2,habitaciones});
    req.flash('success_msg','Inmueble Actualizado Correctamente');
    res.redirect('/inmuebles');
}

inmueblesCtrl.deleteInmueble = async (req,res) =>{
    await Inmueble.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Inmueble borrado exitosamente');
    res.redirect('/inmuebles');
}

module.exports = inmueblesCtrl;