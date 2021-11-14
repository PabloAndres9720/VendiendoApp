const {Router} = require('express');
const router =Router();

const cloudinary =require('cloudinary');
cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
})
const { renderInmuebleForm, 
        createNewInmueble, 
        renderInmuebles, 
        renderEditForm, 
        updateInmueble,
        deleteInmueble
        } = require('../controllers/inmuebles.controllers');


const {isAuthenticated} = require('../helpers/auth');

//new inmueble

router.get('/inmuebles/add',isAuthenticated,renderInmuebleForm);

router.post('/inmuebles/new-inmuebles',isAuthenticated,createNewInmueble);

//get all inmuebles
router.get('/inmuebles',renderInmuebles);


//Update inmuebles
router.get('/inmuebles/edit/:id',isAuthenticated,renderEditForm)
router.put('/inmuebles/edit/:id',isAuthenticated,updateInmueble)


//Delete inmueble

router.delete('/inmuebles/delete/:id',deleteInmueble)

module.exports = router;      