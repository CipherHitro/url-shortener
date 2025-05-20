const { getUser } = require('../services/Auth')

async function restrictToLoggedinUser(req, res, next) {
    const userUid = req.cookies?.uid;
    if(!userUid) {
        console.log(req)
        console.log(" first : ", userUid)
        return res.redirect('../login') 
    }
    const user = getUser(userUid)
    if(!user) {
        console.log( " sec : ",userUid)
        return res.redirect('../login') 
    }
    console.log( " third : ",userUid)
    req.user = user;
    next()
}

module.exports = {
    restrictToLoggedinUser,
}
