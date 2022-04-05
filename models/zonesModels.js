let mongoose = require('mongoose')

let Schema = mongoose.Schema

let zoneShema = new Schema({
    zone : {
        type : String 
    },
    info : {
        type : String 
    },
    identification : {
        type : String 
    },
    materiel : {
        type : String ,
    },
    type : {
        type : String 
    },
    clientId : {
        type : String
    },
    
},{timestamps:true}
)

let Zone = mongoose.model("zone",zoneShema)
module.exports = Zone