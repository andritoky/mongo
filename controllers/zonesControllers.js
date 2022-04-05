let Zone = require('../models/zonesModels')   

let post_creer = async (req , res , next  ) => {
    try {
        console.log( req.body )
    
    }catch(e){
        console.log(e.message)
    }
}

let get_creer = async (req , res , next  ) => {
    res.render('zones/creer')
}

let liste_zones = async (req , res ) => {

}

//CREER ZONE DANS VOIR CLIENT
let post_creer_zones = async (req , res , next  ) => {
    try {
        console.log( req.body )
        let nouveauZone = new Zone({
            zone : req.body.zone ,
            info : req.body.info ,
            identification : req.body.identification ,
            materiel : req.body.materiel ,
            type : req.body.type ,
            clientId : req.params.id ,
        })
        await Zone.create(nouveauZone)
        console.log("nouveau Zone ajouté !")
        console.log( nouveauZone )
    
    }catch(e){
        console.log(e.message)
    }
    res.redirect('/clients/voir/'+ req.params.id) 
}

let zone_client_sup = async (req , res ) => {
    try {
        let zoneId = req.params.id     
        let zoneClientId = await Zone.findById(zoneId)  
            clientId = zoneClientId.clientId
        console.log("ClientID sup  : " + clientId)
        await Zone.findByIdAndRemove(zoneId)
        console.log("ZoneID supprimé : " + zoneId)
        res.redirect('/clients/voir/'+ clientId)  
        
    }catch(e){
        console.log(e.message)
    }
}





module.exports = {
    post_creer,
    post_creer_zones,
    zone_client_sup,
    get_creer,
    liste_zones,   
}