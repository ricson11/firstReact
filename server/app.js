const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

require('./config/passport')(passport);

const app = express();


mongoose.promise = global.promise;
mongoose.connect('mongodb://localhost/first', {
    useCreateIndex: true, useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true,
})
.then(()=>console.log('mongoose connected successfully'))
.catch(err=>console.log(err));


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

//app.use(cors({origin: [`http://localhost:${ process.env.PORT || 4000}`, `https://localhost:${ process.env.PORT|| 4000}`], Credential:'true'}))


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize ());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null;
  
    next();
});






app.use('/', require('./routes/post'));
app.use('/', require('./routes/user'));


app.use(express.static(path.join(__dirname, 'public')));

//Serving the build index react file to server//
app.use(express.static(path.join(__dirname, '../build')))
app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
//ends here//
app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'),()=>console.log('server is running on port' + " "+ app.get('port')));

