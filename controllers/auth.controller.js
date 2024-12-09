const userModel = require('../models/user.model');
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken')

module.exports.registerUser = async function (req,res){
    try {
        const {name, email, password} = req.body
        if(!email || !password){
            req.flash('error', 'Please provide email and password');
            return res.redirect('/');
        }
        const existingUser = await userModel.findOne({email})
        bcrypt.genSalt(8, (err, salt)=>{
            bcrypt.hash(password, salt, async (err, hash)=>{
                if(err) res.send(err.message)
                else{
                    if(existingUser){
                        req.flash('error', 'User already exists');
                        return res.redirect('/');
                    }
                    const user = await userModel.create({
                        name,
                        email,
                        password: hash
                    })
                    const token = generateToken(user)
                    res.cookie("token", token)
                    req.flash("success","User Created")
                    res.redirect('/')
                }
            })
        })
    } catch (error) {
        res.send(error.message)
    }
}
module.exports.loginUser = async function (req,res){
    const {email, password} = req.body
    if(!email || !password){
        req.flash('error', 'Please provide email and password');
        return res.redirect('/');
    }
    const existingUser = await userModel.findOne({email: email})
    if(!existingUser){
            req.flash('error', 'User does not exist');
            return res.redirect('/');
    }
    bcrypt.compare(password, existingUser.password, (error, result)=>{
        if(result){
            const token = generateToken(existingUser)
            res.cookie('token', token)
            return res.redirect('/shop')
        }
        else{
            req.flash('error', 'Invalid Credentials');
            return res.redirect('/');
        }
    })
}
module.exports.logoutUser = async function (req,res){
    res.cookie('token',"")
    res.redirect("/")
}