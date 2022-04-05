let express = require('express')
let router = express.Router()
let auth = require('../config/authenticated')

let clientsControllers = require('../controllers/clientsControllers')

let multer = require('multer') 

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      let extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      cb(null, file.fieldname + '-' + Date.now() + extension)
    }
  })
   
let upload = multer({ storage: storage })

router.get('/', auth.checkAuthenticated , clientsControllers.liste_clients)
router.get('/creer', auth.checkAuthenticated , clientsControllers.get_creer)
router.post('/creer',  upload.single('myImage') , clientsControllers.post_creer)
router.get('/voir/:id', auth.checkAuthenticated , clientsControllers.voir)
router.get('/sup/:id', auth.checkAuthenticated , clientsControllers.sup)
router.get('/edit/:id', auth.checkAuthenticated , clientsControllers.get_edit)
router.post('/edit/:id', upload.single('myImageEdit') , clientsControllers.post_edit)
router.get('/search/:data', clientsControllers.get_search)

module.exports = router