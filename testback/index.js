const express=require("express");
const app=express();
const port=3000;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
app.get("/",(req,res)=>{             // '/' is route
    return res.send("Hello there");
})
const IsLoggedIn=(req,res,next)=>{
    console.log("he is loggedin");
    next();
}
const IsAdmin=(req,res,next)=>{
     console.log("he is a admin");
     next();
}

const Admin=(req,res)=>{
    return res.send("Admin Dash Board")
}


app.get("/admin",IsLoggedIn,IsAdmin,Admin)











app.get("/download",(req ,res)=>{
    return res.send("Click here to download");
})
app.get("/download/project",(req,res) =>{
      return res.send("Project 1");
})
app.listen(port,()=>
{
    console.log("Server is running...");
})