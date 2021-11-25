const express=require("express");
const router=express.Router();

const {isAdmin,isSignedIn,isAuthenticate}=require("../controllers/auth");
const {getUserById,pushOrderInPurchaseList}=require("../controllers/user");
const {updateStock}=require("../controllers/product");

const {getOrderById, createOrder,getAllOrders,getOrderStatus,updateStatus}=require("../controllers/order");

//params
router.param("userId",getUserById);
router.param("orderId",getOrderById);

//actual routes
router.post("/order/create/:userId",
isSignedIn,
isAuthenticate,
pushOrderInPurchaseList,
updateStock,
createOrder
)

router.get("/order/all/:userId",
isSignedIn,
isAuthenticate,
isAdmin,
getAllOrders

)
//status routes
router.get("/order/status/:userId",
isSignedIn,
isAuthenticate,
isAdmin,
getOrderStatus
)

router.put("/order/:orderId/status/:userId",
isSignedIn,
isAuthenticate,
isAdmin,
updateStatus
);

module.exports=router;
