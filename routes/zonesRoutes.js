let express = require('express')
let router = express.Router()

let zonesControllers = require('../controllers/zonesControllers')

router.get('/',zonesControllers.liste_zones )
router.get('/creer', zonesControllers.get_creer)
router.post('/creer', zonesControllers.post_creer)
router.post('/client-creer-zones/:id', zonesControllers.post_creer_zones)

router.get('/zones-client-sup/:id', zonesControllers.zone_client_sup)

  

module.exports = router