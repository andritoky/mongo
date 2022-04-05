let userSession = {}

exports.addUserSession = (data) => {
    userSession = data
    console.log('session :' , userSession)  
}

exports.getUserSession = () => userSession