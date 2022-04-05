let mongoose = require('mongoose')

let Schema = mongoose.Schema

let usersShema = new Schema({
    nom : {
        type : String ,
    },
    contact : {
        type : Number ,
    },
    email : {
        
    },
    password : {
        type : String ,
    },
},{timestamps:true}
)

let User = mongoose.model("user",usersShema)
module.exports = User