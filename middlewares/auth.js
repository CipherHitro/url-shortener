const { getUser } = require('../services/Auth')

async function restrictToLoggedinUser(req, res, next) {
    const token = req.cookies?.uid;
    if(!token) {
        return res.redirect('/login') 
    }
    const user = getUser(token)
    if(!user) {
        return res.redirect('/login') 
    }
    req.user = user;
    next()
}

async function checkAuth(req, res, next) {
    const token = req.cookies?.uid;
    
    const user = getUser(token)
    if(user){
        req.user = user;
    }
    else{
        req.user = {name:"Guest User"}
    }
    next()
}

module.exports = {
    restrictToLoggedinUser,
    checkAuth,
}
