require('dotenv').config()
const mongoose = require('mongoose'); //to handle database
const express=require('express');
const app=express(); //mainly used to handle routes and middlewaes
const cookieParser=require('cookie-parser'); //express middleare taken from npm.js site
const cors=require('cors');
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const orderRoutes=require('./routes/order');
const stripeRoutes=require('./routes/stripepayment')

//DB connection
mongoose.connect(process.env.DATABASE, 
{useNewUrlParser: true, 
useUnifiedTopology: true,
useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED");
})

//defining middlewares
//these middlwares will be there in between request and reponses
app.use(express.json()); //it is also called as body parser middleware which comtails details from front-end
app.use(cookieParser()); //it is required so the when the token is generated we can add that to cookies
app.use(cors()); 
//Routes

app.use("/api",authRoutes); //all the routes from .//routes/auth file is fetched
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",stripeRoutes);


//port 
const port=process.env.PORT||8000;

//server running at port 
app.listen(port,()=>{
 console.log(`app is running at ${port}`);
});

