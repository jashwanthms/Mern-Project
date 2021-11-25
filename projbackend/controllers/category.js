
const Category=require("../models/category");

exports.getCategoryById=(req,res,next,_id)=>{
    Category.findById(_id).exec((err,cate)=>{
        if(err)
        {
            return res.status(400).json({
                error:"category not found in DB"
            })
        }

        req.category=cate;
        next();
    });
}

exports.createCategory=(req,res)=>{
    const category=new Category(req.body); //whatever comming from the front-end put it into category module

    category.save((err,category)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Unable to save category into DB"
            })
        }
       res.json(category);
    })

}

exports.getCategory=(req,res)=>{
return res.json(req.category);
}

exports.getAllCategory=(req,res)=>{

    Category.find().exec((err,items)=>{
        if(err)
        {
            return res.status(200).json({
                err:"Unable to fetch all categories from db"
            })
        }

        res.json(items); //items/categories
    });

}

exports.updateCategory=(req,res)=>{
  const category=req.category; //we are able to grab this because of the parameters what we have passed which will go to middle wares those middlewares(here getCategory id) will set category
  category.name=req.body.name;
  
    
    if(category.name)
    {
        console.log(category.name);
        category.save((err,updatedCategory)=>{
            if(err)
            {
                return res.status(400).json({
                    error:"Unable to update in db"
                  
                })
            }
            res.json(updatedCategory);
        })
    }else{
        return res.status(400).json({
            error:"Form data not passed to backend"
        })
    }
  }
  


exports.removeCategory=(req,res)=>{
    const category=req.category;
    category.remove((err,category)=>{
        if(err)
        {
            return res.status(400).json({
                error:"unable to delete category from db"
            })
        }

        res.json({
            message:`sucessfully deleted ${category.name} category`
        })
    })
}