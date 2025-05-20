const { getUser } = require('../services/Auth')

// async function restrictToLoggedinUser(req, res, next) {
//     const token = req.cookies?.uid;
//     if(!token) {
//         return res.redirect('/login') 
//     }
//     const user = getUser(token)
//     if(!user) {
//         return res.redirect('/login') 
//     }
//     req.user = user;
//     next()
// }

// async function checkAuth(req, res, next) {
//     const token = req.cookies?.uid;
    
//     const user = getUser(token)
//     if(user){
//         req.user = user;
//     }
//     else{
//         req.user = {name:"Guest User"}
//     }
//     next()
// }
async function checkForAuthentication(req, res, next) {
    const token = req.cookies?.uid;
    req.user = null
    if (!token) {
        req.user = {name:"Guest User"}
        return next();
    }
    const user = getUser(token)
    req.user = user;
    next()
}

function restrictTo(roles = []){
    return function (req, res, next) {
        if(!req.user) return res.redirect('/login');

        if(!roles.includes(req.user.roles)) return res.json("UnAuthorized")

        return next()
    }
}
module.exports = {
    // restrictToLoggedinUser,
    // checkAuth,
    checkForAuthentication,
    restrictTo
}
