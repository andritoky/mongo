let express = require('express')
let mongoose = require('mongoose')
require('./config/dbLocale')

let bodyParser = require('body-parser')
let app = express()

let clientsRoutes = require('./routes/clientsRoutes')
let usersRoutes = require('./routes/usersRoutes')
let zonesRoutes = require('./routes/zonesRoutes')

let path = require('path')
let multer = require('multer')
let bcrypt = require('bcrypt') 
let passport = require('passport') 
let flash = require('express-flash') 
let session = require('express-session') 
let methodOveride = require('method-override')  // logout

let port = 3001

//moteur de template Ejs dans express
app.set('view engine','ejs')    
 
// VIEWS ET MIDDLEWARE                     
app.use(express.static('public'));          //utilisé 'dossier public' pour tout fichir static   //app.use('/asset'.static('public'))      //tous ce qui est asset 'doc piblic' dans linkreel html ajouter '/asset:'
app.use(bodyParser.urlencoded({ extended: false }))  
app.use(bodyParser.json()) 

app.use(flash())     // message flash
app.use(session({
    secret: 'monkeycat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }     // true en mode production pour ma securité
  }))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOveride('_method'))

// ---------------
//AUTHENTIFICATION 


// connect passport and auth et app a passport config

let initializePassport = require('./config/passport-config')
    initializePassport(passport)

let auth = require('./config/authenticated')

app.get('/', auth.checkAuthenticated , (req,res)=>{                         
  res.redirect('/login')                    
})

app.get('/login', auth.checkNotAuthenticated,  (req,res)=>{                         
    res.render('login')                     
 })

app.post('/login', passport.authenticate('local', { 
         successRedirect: '/clients',
         failureRedirect: '/login',
         failureFlash: true 
}));

app.delete('/logout',  (req,res)=>{                         
    req.logOut()   
    res.redirect('/login')

  })




// UTILISER les ROUTERS
app.use('/clients', clientsRoutes)
app.use('/users', usersRoutes)
app.use('/zones', zonesRoutes)




app.listen(port)
console.log('Mongo.js run on port : '+port)






