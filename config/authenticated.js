
let checkNotAuthenticated = async (req, res, next)  => {
      if (req.isAuthenticated()) {
        return res.redirect('/clients')
      }
      next()
}  

let checkAuthenticated = async (req, res, next)  => {
      if (req.isAuthenticated()) {
        return next()
      }
    
      res.redirect('/login')
} 


module.exports = {
  checkNotAuthenticated,
  checkAuthenticated
}
