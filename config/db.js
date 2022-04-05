let mongoose = require('mongoose')

let uri = "mongodb+srv://toky:lantoniaina@cluster0.sh3ga.mongodb.net/monbd?retryWrites=true&w=majority";

mongoose.connect(uri,{
    useNewUrlParser :true,
    //useCreateIndex : true,
    useUniFiedTopology : true
})

try {
    let connection = mongoose.connection
    connection.once("open" , ()  => {
        console.log('connection Base de donnée succes !')
    })
}catch(e){
    console.log(e.message)
}
