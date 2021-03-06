const User = require("../models/user");
const { check,validationResult } = require('express-validator'); //taken from express validator site
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
 // both jwt and exppressJwt are used for generating token using a secrete key
exports.signup = (req, res) => {
  const user = new User(req.body);
  const errors = validationResult(req);
  if(!errors.isEmpty())
  {
     return res.status(400).json({
       error:errors.array()[0].msg
     });
  }

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

exports.signin=(req,res)=>{
 const {email,password}=req.body; //destructuring of data suppose body is big object we will extract some info from that object
 const errors = validationResult(req);
 if(!errors.isEmpty())
 {
    return res.status(400).json({
      error:errors.array()[0].msg
    });
 }
 //searchig in db for email just a mpngodb command
User.findOne({email},(err,user)=>{  //if email found the generate entireuser else err
    if(err || !user)
    {
      return res.status(400).json({
       error:"User email does not exist"
      })
    }

    if(!user.autheticate(password)){ //this method authenticate is there in user modle in modle folder

     return res.status(401).json({
        error:"User email and password do not match"
      })
    }
    //create token
    //token is generated using jsonweb token 
    const token=jwt.sign({_id:user._id},process.env.SECRETE);

     //put this token into cookie so that we can authenticate the user when he revisits our website again
      res.cookie("token",token,{expire:new Date()+9999}) //here date is added so that we can destroy that cookie after some time

      //response to front end
      const {_id,name,email,role}=user;
      return res.json({token,user:{_id,name,email,role}});
   
})
};

exports.signout = (req, res) => {
res.clearCookie("token");

  res.json({
    message: "User signout"
  });
};

//protected route
//to protect our route and to give the user some extra privilages if he has logged in properly
//by authenticating the user an _id is generated by the below code (till 83) which is further use by is
//is Authenticate middleware to check his details from front-end with his sign in details

exports.isSignedIn=expressJwt({   //used for validating json token present inside the cookie
  secret:process.env.SECRETE,
  userProperty:"auth"
})
//json webtoken is generated when the user loggs in and that webtoken which is genrated is validated via
//expressJwt so that we can give user some additional privilages for his own application

//custom middlewares
exports.isAuthenticate=(req,res,next)=>{
 let checker=req.profile && req.auth && req.profile._id ==req.auth._id;
 if(!checker)
 {
    return res.status(403).json({
      error:"ACCESS DENIED"
    });
 }
 next();
}

exports.isAdmin=(req,res,next)=>{
  if(req.profile.role==0)
  {
    return res.status(403).json({
      error:"You are not an Admin,ACCESS DENIED"
    });
  }
  next();
}

/*
in the above middlewares req.profile is set from the front end
-------
req.profile && req.auth && req.profile_id ==req.auth._id
here profile which is comming from the front end and authentication detatils should match
along with that profile(_id) which is set when the user logged in into the data base
should match with auth._id after he is auhenticated 

*/