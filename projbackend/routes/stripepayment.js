const express=require("express");
const router=express.Router();
const {stripepayment}=require("../controllers/stripepayment")
router.post("/stripepayment",stripepayment)


module.exports=router;
