const stripe=require("stripe")("sk_test_51JdU38SFNfnTTvGiTIKruQjnXKOAbiQsbO1ShwCcly5KDilHwRDwqPzsQJ25HBzdSRCzWxOYPwAac7PzNLiSbFcj00pBwojmqP")
const { v4: uuidv4 } = require('uuid');

exports.stripepayment=(req,res)=>{

  
    const {products,token}=req.body
      
    console.log("products",products);

    let amount=0;
    products.map(p=>{
        amount=amount+p.price;
    })

     const idempotencyKey=uuid()

     return stripe.customers.create({
         email:token.email,
         source:token.id
     }).then(customer=>{
         customer.charges.create({
             amount:amount*100,
             currency:'usd',
             customer:customer.id,
             recipt_email:token.email,
             shipping:{
                        name:token.card.name,
                        address:{
                            line1:token.card.address_line1,
                            line2:token.card.address_line2,
                            city:token.card.address_city,
                            country:token.card.address_country,
                            postalcode:roken.card.address_zip                
                        }
             }
         },{idempotencyKey})
         .then(result=>{res.status(200).json(result)})
         .catch(err=>console.log(err))
     })

}