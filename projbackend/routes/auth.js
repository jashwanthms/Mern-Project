const { check } = require('express-validator'); //taken from express validator site

//express validator is basically used to validate the data before sending itinto db

var express = require('express')
var router = express.Router()
const {signout,signup,signin, isSignedIn}=require("../controllers/auth");

router.post("/signup",[
    check("name").isLength({min:5}).withMessage(' name must be at least 5 chars long'),
    check("email").isEmail().withMessage('Email is required'),
    check("password").isLength({min:3}).withMessage('password must be 3 chars long').matches(/\d/).withMessage('must contain a number')
],signup); 

router.post("/signin",[
    check("email").isEmail().withMessage('Email is not in correct format'),
    check("password").isLength({min:3}).withMessage('password must be 3 chars long').matches(/\d/).withMessage('must contain a number')
],signin);

router.get("/testroute",isSignedIn,(req,res)=>{
    res.json(
        req.auth
    )
})
router.get("/signout",signout);

module.exports=router;