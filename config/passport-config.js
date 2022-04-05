
let addUserSession = require('./session').addUserSession

let LocalStrategy = require('passport-local').Strategy
let Users = require('../models/usersModels')   
let bcrypt = require('bcrypt') 

function initialize(passport){

      let authenticateUser = async (userEmail, password, done) => {
        let user = await Users.findOne({email:userEmail})
        console.log( user)
        
        if (user == null) {
          return done(null, false, { message: 'No user with that email !' })
        }
      
        try {
          if (await bcrypt.compare(password, user.password)) {
            addUserSession(user)
            return done(null, user)
          } else {
            return done(null, false, { message: 'Password incorrect !' })
          }
        } catch (e) {
          return done(e)
        }
      }
      
passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
      
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
     return done(null,Users.findById(id))
 })
      

}module.exports = initialize
