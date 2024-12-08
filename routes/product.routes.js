const express = require('express')
const router = express.Router();
const umpload = require('../config/multer')
const productModel = require('../models/product.model')

router.post('/create', umpload.single("image") ,async (req,res)=>{
   try{ const { name, price, discount, bgColor, panelColor, textColor} = req.body
    const product = await productModel.create({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgColor,
        panelColor,
        textColor
    })
    req.flash("success", "Product created successfully")
    res.redirect("/seller/admin")
}
    catch(error){
        res.send(error.message)
    }
})

module.exports = router;