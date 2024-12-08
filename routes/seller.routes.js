const express = require('express');
const sellerModel = require('../models/seller.model');
const router = express.Router();

router.post('/create', async (req,res)=>{
    const seller = await sellerModel.find()
    if(seller.length>0){
        res.status(503).send("You cannot create a new seller") 
    }
    let {name, email, password, contact} = req.body
    const createdSeller = await sellerModel.create({
        name,
        email,
        password,
        contact
    })
    res.status(201).send(createdSeller)
})

router.get('/admin', (req,res)=>{
    const success = req.flash("success")
    res.render("createproducts", {success})
})

module.exports = router;