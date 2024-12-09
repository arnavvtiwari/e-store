const express = require('express')
const router = express.Router()
const isLoggedin  = require('../middleware/isLoggedin');
const productModel = require('../models/product.model');
const userModel = require('../models/user.model');


router.get('/',(req,res)=>{
    const error = req.flash("error"); 
    const success = req.flash("success")
    res.render('index', {success ,error, loggedIn: false });
})
router.get('/cart/:productId', isLoggedin, async (req,res)=>{
    console.log(req.user)
    let user = await userModel.findOne({email: req.user.email})
    user.cart.push(req.params.productId)
    user.save()
    req.flash("success","Added to card")
    res.redirect('/shop')
})
router.get('/shop', isLoggedin, async (req, res)=>{
    const products = await productModel.find();
    const success = req.flash("success")
    res.render('shop', { products, success });

})
router.get('/cart', isLoggedin, async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email}).populate("cart")
    res.render('cart',{user});

})

module.exports = router