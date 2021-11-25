const express=require("express");
const router=express.Router();


 const {isAdmin,isAuthenticate,isSignedIn}=require("../controllers/auth");
 const {getUserById}=require("../controllers/user");
 const {getProductById,
    createProduct,
    getProduct,
    photo,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllUniqueCategories }=require("../controllers/product"); 

//param routes
 router.param("userId",getUserById);
router.param("productId",getProductById);

//actual routes
//write route
 router.post("/product/create/:userId",isSignedIn,isAuthenticate,isAdmin,createProduct);

 //read routes
 router.get("/product/:productId",getProduct);
 router.get("/product/photo/:productId",photo);

 //delete routes
router.delete("/product/:productId/:userId",
isSignedIn,
isAuthenticate,
isAdmin,
deleteProduct
)
 //update routes

router.put("/product/:productId/:userId",
isSignedIn,
isAuthenticate,
isAdmin,
updateProduct
)

//listing products
router.get("/products",getAllProducts);

//listing categories

router.get("/products/categories",getAllUniqueCategories);
module.exports=router;