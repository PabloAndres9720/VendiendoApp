const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer');

//Initializacions
const app = express();
require('./config/passport');

//settings
app.set('port',process.env.PORT || 5000)
app.set('views', path.join(__dirname ,'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))

app.set('view engine','.hbs');

//Middleware
app.use(morgan('dev'));

app.use(express.urlencoded({extended:false}));

const storage = multer.diskStorage({
    destination: path.join(__dirname,'public'),
    filename: (req,file,cb) => {
        cb(null,new Date().getTime() + path.extname(file.originalname));
    }
});

app.use(multer({storage}).single('image'));

app.use(methodOverride('_method'));
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Global variables
app.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user =req.user || null;  
    next();
});

//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/inmuebles.routes'));
app.use(require('./routes/user.routes'));


//Static files
app.use(express.static(path.join(__dirname,'public')));

module.exports = app;

