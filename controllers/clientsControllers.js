
let Client = require('../models/clientsModels')  
let Zones = require('../models/zonesModels')  
let path = require('path')

let getUserSession = require('../config/session').getUserSession


let liste_clients = async (req , res ) => {
    let userSession =  await getUserSession()
    let listClient = await Client.find({})
    res.render('clients/clients',{dataClient:listClient , dataUser : userSession})
} 

let get_creer = async (req , res ) => {
    let userSession =  await getUserSession()
    res.render('clients/creer',{dataUser : userSession})    
}

let post_creer = async (req , res , next  ) => {
    
    try {
        console.log( req.body )
        console.log(req.file.filename);
        
        let nouveauClient = new Client({
            nom : req.body.nom ,
            adresse : req.body.adresse ,
            description : req.body.description,
            image : req.file.filename
        })
        await Client.create(nouveauClient)
        console.log("nouveau client ajouté !")
        console.log(nouveauClient);
        
    }catch(e){
        console.log(e.message)
    }
    res.redirect('/') 
}

let voir = async (req , res ) => {
    let userSession =  await getUserSession()
    let clientId = req.params.id 
    let voirClient = await Client.findById(clientId)
    let zonesClient = await Zones.find({clientId : clientId})
    res.render('clients/voir',{ dataVoir : voirClient , dataZones : zonesClient , dataUser : userSession})    

    
}

let sup = async (req , res ) => {
    let clientId = req.params.id                    
    await Client.findByIdAndRemove(clientId)
    console.log("data supprimé : " + clientId)
    res.redirect('/clients' )  
}

let get_edit = async (req , res ) => {
    let userSession =  await getUserSession()
    let clientId = req.params.id    
    let editClient = await Client.findById(clientId)
    res.render('clients/edit',{dataEdit:editClient , dataUser : userSession}) 
}

let post_edit = async (req , res ) => {
    let clientId = req.params.id 
    //console.log(req.file);   
    await Client.findByIdAndUpdate(clientId,{
            nom : req.body.nom ,
            adresse : req.body.adresse ,
            description : req.body.description,
            image : req.file.filename
    })
    console.log("Modification fait  : " + clientId)
    res.redirect('/clients')  
}

let get_search = async (req , res ) => {
    let data = req.params.data    
    let searclient = await Client.find({nom: { $regex: '.*' + data + '.*'} })
    res.send(searclient)
}



module.exports = {
    liste_clients,
    post_creer,
    get_creer,
    voir,
    sup,
    get_edit,
    post_edit,
    get_search
}