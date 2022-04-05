let mongoose = require('mongoose')
let uri = "mongodb://127.0.0.1:27017/test";

mongoose.connect(uri,{
    useNewUrlParser :true,
    //useCreateIndex : true,
    useUniFiedTopology : true,
})

try {
    let connection = mongoose.connection
    connection.once("open" , ()  => {
        console.log('Local connexion succes !')
    })
}catch(e){
    console.log(e.message)
}
