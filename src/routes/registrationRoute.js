const express = require('express');
const router = express.Router();

const { validationResult } = require('express-validator');

const registrationSchema = require ('../validators/registrationSchema')
const registrationRules = require ('../validators/registrationRules')


router.post('/ruleBased',registrationRules, (req, res) =>{

 const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(201).json({body : errors.array()})
    }res.status(201).json({ message: 'User registered successfully!' });

} )

router.post('/schemaBased', registrationSchema, (req,res) => {
    console.log("Hereee")
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(201).json({body : errors.array()})
    }res.status(201).json({ message: 'User registered successfully!' });
})


module.exports = router;
