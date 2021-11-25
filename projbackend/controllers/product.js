const Product=require('../models/product');

const formidable=require('formidable');
const _=require("lodash");
const fs=require("fs"); //to locate actual file path

exports.getProductById=(req,res,next,id)=>{
    Product.findById(id).populate("Category").exec((err,product)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Unable to get the product id"
            });
        }

        req.product=product;
        next();
    });
};

exports.createProduct=(req,res)=>{
    let form=new formidable.IncomingForm();
        form.keepExtensions=true; 
        
        form.parse(req,(err,fields,file)=>{
            if(err)
            {
                return res.status(400).json({
                    error:"problem with image"
                })
            }
    
            // destructuring the fields
    
            const {name, Description,price,category,stock}=fields;
            if(
               !name||
               !Description||
               !price||
               !category||
               !stock ){
                      return res.status(400).json({
                          error:"please include all fields"
                      });
            }
        
    
            let product=new Product(fields);
    
           if(file.photo)
           {
            if(file.photo.size >5000000)
            {
                return res.status(400).json({
                    error:"File size should be less than 5mb"
                })
            }
            product.photo.data=fs.readFileSync(file.photo.path); //to take filepath we fs and to verify it we use formidable 
            product.photo.contentType=file.photo.type;  
        }
    
        //save to db
    
        product.save((err,product)=>{
            if(err)
            {
                return res.status(400).json({
                    error:"Unable to save photo to db"
                })
            }
    
            res.json(product);
        });
        });
    }

exports.getProduct=(req,res)=>{
    req.product.photo=undefined;
    return res.json(req.product);
}    

//middle ware
//for get request we are not directly fetching the photo from the db as it may be time
//--consuming process so we will fetch it with the help of middleware
//--so that text data can be processed very fast while image will be loading

exports.photo=(req,res,next)=>{
    if(req.product.photo.data)
    {
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

//delete
exports.deleteProduct=(req,res)=>{
let product=req.product;

product.remove((err,deletedProduct)=>{
    if(err)
    {
        return res.status(400).json({
            error:"Unable to delete in db"
        })
    }

    res.json({
        message:"Deleted sucessfully",
        deletedProduct
    })
})

}

//update 
exports.updateProduct=(req,res)=>{
    let form=new formidable.IncomingForm();
    form.keepExtensions=true; 
    
    form.parse(req,(err,fields,file)=>{
        if(err)
        {
            return res.status(400).json({
                error:"problem with image"
            })
        }

        // destructuring the fields

        

        let product=req.product;
        product=_.extend(product,fields); //all the fields which user is updating will
        //--move into this req.product which came because of middleware

       if(file.photo)
       {
        if(file.photo.size >5000000)
        {
            return res.status(400).json({
                error:"File size should be less than 5mb"
            })
        }
        product.photo.data=fs.readFileSync(file.photo.path); //to take filepath we fs and to verify it we use formidable 
        product.photo.contentType=file.photo.type;  
    }

    //save to db

    product.save((err,product)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Updation of product to db failed"
            })
        }

        res.json(product);
    });
    });
}
//listing
exports.getAllProducts=(req,res)=>{
    let limit=req.query.limit?parseInt(req.query.limit): 8 //number of products to be displayed will be choosen by the user
    let sortBy=req.query.sortBy?req.query.sortBy :"_id" //by default sort based on id if we don't get sortBy from the front-end 
    Product.find()
    .select("-photo")   //don't select photo to fetch
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err)
        {
            return res.status(400).json({
                error:"unable to get products"
            })
        }

        res.json(products);
    })
}

exports.getAllUniqueCategories=(req,res)=>{
    Product.distinct("category",{},(err,category)=>{  //inplace of Product.distinct we can use Product.findById using Category id 
        if(err)
        {
            return res.status(400).json({
                error:"No unique category found"
            })
        }
        return res.json(category);
    })
};


exports.updateStock=(req,res,next)=>{
    let myOperations=req.body.order.products.map(prod =>{
    return{
        updateOne:{
            filter:{_id:prod._id},
            update:{$inc:{stock:-prod.count,sold:+prod.count}}
        }
    }
    });

    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Bulk operation of updating both sold and stock cannot be performed"
            });
        }
        next();
    });
};