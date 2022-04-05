let mongoose = require('mongoose')

let Schema = mongoose.Schema

let clientShema = new Schema({
    nom : {
        type : String ,
        //required : true ,
        //unique : true 
    },
    adresse : {
        type : String ,
        //required : true ,
        //unique : true 
    },
    description : {
        type : String ,
        //required : true ,
        //unique : true 
    },
    image : {
        type : String ,
        //required : true ,
        //unique : true 
    },
},{timestamps:true}
)

let Client = mongoose.model("client",clientShema)
module.exports = Client