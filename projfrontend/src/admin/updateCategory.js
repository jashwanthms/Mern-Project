import React ,{useEffect,useState}from 'react'
import { Link } from 'react-router-dom';
import {getACategory,updateCategory} from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper';  
import Base from '../core/Base';  
const UpdateCategory=({match})=> {

    const {user,token}=isAuthenticated();
  
    const [values,SetValues]=useState({
        name:"",
        error:"",
        formData:"",
        loading:false,
        createdCategory:""
    });
    
    const {name,loading,formData,error,createdCategory}=values

     const preload=(categoryId)=>{
        getACategory(categoryId).then(
               data=>{
               // console.log(data)
                   if(data.error)
                   {
                       SetValues({...values,error:data.error});
                   }else{
                       SetValues({
                           ...values,
                           name:data.name,
                           formData:new FormData()
                          
                       })
                      
                   }
               }
    
        )
    }
    
    
    useEffect(()=>{
        preload(match.params.categoryId);
    },[]
    );



     const goToAdminpanel=()=>(
         <div className="mt-3">
         <Link className="btn btn-md btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
         </div>
     )

     const handleChange=name=>event=>{
        const value=event.target.value;
          formData.set(name,value);
         // console.log(formData.get("name"))
        SetValues({...values,[name]:value})
      
      };

     const onSubmit=event=>{
      event.preventDefault()
     
      SetValues({...values,error:"",loading:true})
      //backend-request

      updateCategory(match.params.categoryId,user._id,token,formData.get("name")).then(data=>{

      console.log( "up categoru insidde",formData.get("name"))
        if(data.error)
        {
            SetValues({...values,error:data.error})
            console.log(data.error)
            console.log("match.params.cid",match.params.categoryId)
            console.log("user Id",user._id);
            console.log("form data",formData.name);
        }else{
            SetValues({...values,
                name:"",
                loading:false,
                createdCategory:data.name
                })
        }

      })
      
     }

    const successMessage=()=>{

        if(createdCategory)
        {
            return <h4 className="text-success">Category Updated Successfully</h4>
        }
      

    }

    const ErrorMessage=()=>{

        if(error)
        {
            console.log(error);
            return <h4 className="text-danger">Failed to Update Category</h4>
        }
    }
    const myCategoryForm=()=>(

        <form>
        <div className="form-group">
            <p className="lead">Enter the category</p>
            <input className="form-control my-4"
            input="text"
            autoFocus
            onChange={handleChange("name")}
            value={name}
            required
            placeholder="example:Summer collection"
            />

           
            <button type="submit" onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
        </div>
        
        </form>

    )


    return (
        <div>
        <Base title="Update a category here"
              description="update a  category for t-shirt"
               className="container bg-info p-4"
        >
        <div className="row  bg-white rounded">
            <div className="col-md-8 offset-md-2">
            {successMessage()}
            {ErrorMessage()}
            {myCategoryForm()} {goToAdminpanel()}
            </div>
        </div>
        </Base>

       </div>
    )
}
export default UpdateCategory;