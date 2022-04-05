let express = require('express')
let router = express.Router()

let usersControllers = require('../controllers/usersControllers')

router.get('/', usersControllers.liste_users)
router.get('/creer',  usersControllers.get_creer)
router.post('/creer', usersControllers.post_creer)
router.get('/voir/:id',  usersControllers.voir)
router.get('/sup/:id',  usersControllers.sup)
router.get('/edit/:id',  usersControllers.get_edit)
router.post('/edit/:id', usersControllers.post_edit)

  

module.exports = router