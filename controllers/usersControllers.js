let Users = require('../models/usersModels')   

let bcrypt = require('bcrypt') 


let liste_users = async (req , res ) => {
    let listUsers = await Users.find({})
    res.render('users/users',{dataUsers:listUsers })
}

let get_creer = async (req , res ) => {
    res.render('users/creer')    
}

let post_creer = async (req , res , next  ) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let nouveauUsers = new Users({
            nom : req.body.nom ,
            contact : req.body.contact ,
            email : req.body.email,
            password : hashedPassword
        })
        await Users.create(nouveauUsers)
        console.log( nouveauUsers )
        console.log("nouveau User ajouté !")
        
    }catch(e){
        console.log(e.message)
    }
    res.redirect('/') 
}

let voir = async (req , res ) => {
    let userId = req.params.id 
    let voirUser = await Users.findById(userId)
    res.render('users/voir',{dataVoir:voirUser })    
}

let sup = async (req , res ) => {
    let userId = req.params.id                    
    await Users.findByIdAndRemove(userId)
    console.log("data supprimé : " + userId)
    res.redirect('/users' )  
}

let get_edit = async (req , res ) => {
    let userId = req.params.id    
    let editUser = await Users.findById(userId)
    res.render('users/edit',{dataEdit:editUser}) 
}

let post_edit = async (req , res ) => {
    let userId = req.params.id    
    await Users.findByIdAndUpdate(userId,{
            nom : req.body.nom ,
            contact : req.body.contact ,
            email : req.body.email,
            password : req.body.password
    })
    console.log("Modification fait  : " + userId)
    res.redirect('/users')  
}


module.exports = {
    liste_users,
    post_creer,
    get_creer,
    voir,
    sup,
    get_edit,
    post_edit
}