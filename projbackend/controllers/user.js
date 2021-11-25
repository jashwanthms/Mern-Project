
const User=require("../models/user");
const Order=require("../models/order");
//getUserById is a middleware so we will not use that in routes folder's user.js
//instead of that we use getUser

exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
         if(err || !user)
         {
             return res.status(400).json({
                 err:"No user with this mentioned id was found in db"
             })
         }

         req.profile=user;
         next();
    })
}

exports.getUser=(req,res)=>
{
    //these four information we are not undefining in the db but we are not showing these sensitive information
    //to the user in the front end part
    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    return res.json(req.profile);
}


// exports.getAllUser=(req,res)=>{
//     User.find().exec((err,users)=>{
//          if(err || !users)
//          {
//              return res.status(400).json({
//                  err:"No users"
//              })
//          }

//          res.json(users);   
       
//     })
// }

exports.updateUser=(req,res)=>{

    User.findByIdAndUpdate(
        {_id:req.profile._id}, //req.profile is set getUserByid middleware called by router.param in user.js(routes folder) 
        {$set:req.body},
        {new:true,useFindAndModify:false},
      (err,user)=>{
          if(err)
          {
               return res.status(400).json({
                   err:"You are not authorized to update"
               });
          }

          user.salt=undefined;
          user.encry_password=undefined;
          user.createdAt=undefined;
          user.updatedAt=undefined;
          res.json(user);

      }
       
    )
}

exports.userPurchaseList=(req,res)=>
{
    Order.find({user:req.profile._id})
    .populate("user","_id name")          //populate 
    .exec((err,order)=>{
        if(err)
        {
            return res.status(400).json({
                error:"No orders in this account"
            })
        }
        return res.json(order);
    })
}

exports.pushOrderInPurchaseList=(req,res,next)=>{
    let purchases=[];
    req.body.order.products.forEach(product=>{
        purchases.push({
            _id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.amount,
            transaction_id:req.body.order.transaction_id

        });
    });

    // now store let purchases in to db

    User.findByIdAndUpdate(
        { _id:req.profile._id},
        {$push:{purchases:purchases}},  //updating things in purchase list of user module
        {new:true},
        (err,purchases)=>
        {
           if(err)
           {
               return res.status(400).json({
                   error:"unable to save purchase list"
               })
           }
           next();
        }

    )

}