const {Order,ProductCart}=require("../models/order");


exports.getOrderById=(req,res,id,next)=>{
    Order.findById(id)
         .populate("products.product","name price")
         .exec((err,order)=>{
             if(err)
             {
                 return res.status(400).json({
                     error:"No order is found"
                 })
             }
             req.order=order;
             next();
         })
}

exports.createOrder=(req,res)=>{
    req.body.order.user=req.profile; //as we are user ref:"User" in orderschema;
    const order=new Order(req.body.order); //new order will be created and its refrence will be put in to order
      order.save((err,order)=>{
          if(err)
          {
              return res.status(400).json({
                  error:"Unable to create order into DB"
              })
          }
          res.json(order);
      })
}

exports.getAllOrders=(req,res)=>{
    Order.find()
         .populate("user","_id name")
         .exec((err,orders)=>{
             if(err)
             {
                 return res.status(400).json({
                     error:"No order found"
                 })
             }

             res.json(orders);
         });
}



exports.getOrderStatus=(req,res)=>{
 res.json(Order.schema.path("status").enumValues)
};
exports.updateStatus=(req,res)=>{
   Order.update(
       {_id:req.body.orderId},
       {$set:{status:req.body.status}},  //here status will come from front-end
       (err,order)=>{
           if(err)
           {
               return res.status(400).json({
                   error:"Updation of status failed"
               })
           }

           res.json(order);
       }
       
   )
};