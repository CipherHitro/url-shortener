const User = require('../models/user')
const { setUser, getUser } = require('../services/Auth')
const bcrypt = require('bcryptjs')

async function handleUserSignUp(req, res) {
    const { name , email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passHash = bcrypt.hashSync(password, salt);
    const user = await User.create({
        name,
        email,
        password : passHash
    })
    res.render('login')
} 

async function handleUserLogIn(req, res) {
    const { email, password } = req.body;
    
    const user = await User.findOne({email})
    // res.render('home' , {user})
    // console.log(user)
    if(!user){
        return res.render('login', {error : "Invalid credentials"})
        
    }
    
    const authUser = bcrypt.compareSync(password, user.password);
    if(!authUser){
        return res.render('login', {error : "Invalid credentials"})

    }

    const token = setUser(user)
    const isAdmin = getUser(token);
    res.cookie('uid', token)
    console.log("admin : ", isAdmin)
    if(isAdmin.roles == "ADMIN"){
        return res.redirect('/url/admin');

    }
    return res.redirect('/');

} 

module.exports = {
    handleUserSignUp, 
    handleUserLogIn,
}