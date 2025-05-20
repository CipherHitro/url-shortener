const User = require('../models/user')
const { v4: uuidv4 } = require('uuid'); 
const { setUser, getUser } = require('../services/Auth')

async function handleUserSignUp(req, res) {
    const { name , email, password } = req.body;
    
    const user = await User.create({
        name,
        email,
        password
    })
    res.redirect('login')
} 

async function handleUserLogIn(req, res) {
    const { email, password } = req.body;
    
    const user = await User.findOne({email, password})
    // res.render('home' , {user})
    // console.log(user)
    if(!user){

        return res.render('login', {error : "Invalid username or password"})
        
    }
    
    const token = setUser(user)
    res.cookie('uid', token)
    return res.redirect('/');

} 

module.exports = {
    handleUserSignUp, 
    handleUserLogIn,
}