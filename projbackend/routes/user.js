const express=require("express");
const router=express.Router();

const {getUserById, getUser,userPurchaseList,updateUser}=require("../controllers/user");
const {isSignedIn,isAuthenticate,isAdmin}=require("../controllers/auth");

router.param("userId",getUserById); //its's a middlware first userId will go into this then to mentioned routes below 
//get user by id will populate the data of the user wherever userId matches in db that is req.profile will populate
//by matching with the frontend data
//here getUserById is automatically called up whenever we pass userid in the route
//getUserByid is middleware so we are using router.get("/user/:userId",getUser) which will take the user data to fronend

router.get("/user/:userId",isSignedIn,isAuthenticate,getUser);
//before showing user details to front end we will check whether user is signed in or not
//is authenticated or not and isadmin or not

// router.get("/users",getAllUser);

router.put("/user/:userId",isSignedIn,isAuthenticate,updateUser);

//

router.put("/orders/user/:userId",isSignedIn,isAuthenticate,userPurchaseList);

module.exports=router;