import React,{useState,useEffect} from 'react'
import { Link ,Redirect} from 'react-router-dom';
import Base from '../core/Base';
import { getAllCategories, getAproduct,updateProduct} from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';

const UpdateProduct=({match})=> {

    const {user,token}=isAuthenticated();

    const [values,SetValues]=useState({
        name:"",
        Description:"",
        price:"",
        stock:"",
        photo:"",
        categories:[],
        category:"",
        loading:false,
        error:"",
        createdProduct:"",
        getaRedirect:false,
        formData:""
    })

    const {name,
        Description,
        price,
        stock,
        categories,
        category,
        loading,
        error,
        createdProduct,
        getaRedirect,
        formData}=values

const preload=(productId)=>{
    getAproduct(productId).then(
           data=>{
           // console.log(data)
               if(data.error)
               {
                   SetValues({...values,error:data.error});
               }else{
                   SetValues({
                       ...values,
                       name:data.name,
                       Description:data.Description,
                       price:data.price,
                       category:data.category._id,
                       stock:data.stock,
                       formData:new FormData(),
                      
                    
                   })
                   preloadCategories()
               }
           }

    )
}
const preloadCategories=()=>{
         getAllCategories().then(data=>{
             if(data.error)
             {
                 SetValues({...values,error:data.error})
             }else{
                 SetValues({categories:data,
                  formData:new FormData()
                })
             }
         })
}

useEffect(()=>{
    preload(match.params.productId);
},[]
);

const onSubmit=(event)=>{
event.preventDefault()
SetValues({...values,error:"",loading:true})


updateProduct(match.params.productId,user._id,token,formData).then(
  data=>{
    if(data.error)
    {
      SetValues({...values,error:data.error})
      console.log(data.error)
    }else{
      SetValues({...values,
      name:"",
      Description:"",
      price:"",
      photo:"",
      stock:"",
      loading:false,
      createdProduct:data.name

      })
    

    }
  }
)

}
const handleChange=name=>event=>{
  const value=name==="photo"?event.target.files[0]:event.target.value;
  formData.set(name,value);
  SetValues({...values,[name]:value})

};

const SuccessMessage=()=>(
  <div className="alert alert-success mt-3"
  style={{display:createdProduct?"" :"none"}}
  >
 <h3>{createdProduct}Updated SuccessFully</h3>
   
  </div>
);


const ErrorMessage=()=>(
  <div className="alert alert-danger mt-3"
  style={{display:error?"":"none"}}
  >
  <h3>Unable to  Update a product</h3>
  </div>
)
    const createProductForm = () => (
      <div className="row">
      <div className="col-md-10 offset-sm-1">

        <form >
          <span className="text-white text-left">Post photo</span>
          <div className="form-group">
            <label className="btn col-12 btn-success mb-2">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control mb-2"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("Description")}
              name="photo"
              className="form-control mb-2"
              placeholder="Description"
              value={Description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control mb-2"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control mb-2"
              placeholder="Category"
            >
              <option>Select</option>
         
              {categories &&
                categories.map((cate, index) => (
                  <option key={index} value={cate._id}>
                    {cate.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control mb-2"
              placeholder="Stock"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-lg btn-outline-success col-3">
       Update Product
      </button>
        </form>

      </div>
      </div>
      );


    return (
        <Base title="Add Product"
         description="Start adding products from here"
         className="container bg-info p-4"
        >
       <Link to="/admin/dashboard" className="btn btn-primary btn-md mt-1 mb-2 rounded">Admin Home</Link>
        <div className="row bg-dark text-white rounded">
        <div className="btn btn-lg col-8 offset-md-2">
              {ErrorMessage()}
             {SuccessMessage()}
             {createProductForm()}
          

        </div>
        </div>
        </Base>
    )
}
export default UpdateProduct;