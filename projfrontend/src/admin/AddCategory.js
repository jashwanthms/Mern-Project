import React,{useState} from 'react'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { Createcategoy } from './helper/adminapicall';

const AddCategory=()=>{
     
       const [name,setName]=useState("");
       const [error,setError]=useState(false);
       const [success,setSuccess]=useState(false);

        const {user,token}=isAuthenticated();


        const goToAdminpanel=()=>(
            <div className="mt-3">
            <Link className="btn btn-md btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
            </div>
        )

        const handleChange=event=>{
              setError("")
              setName(event.target.value)
        }

        const onSubmit=event=>{
         event.preventDefault()
         setError("")
         setSuccess(false)
        
         //backend-request

         Createcategoy(user._id,token,{name}).then(data=>{
  
           if(data.error)
           {
               setError(true);
           }else{
               setError("");
               setSuccess(true);
               setName("")
           }

         })
         
        }

        const successMessage=()=>{

            if(success)
            {
                return <h4 className="text-success">Category Created Successfully</h4>
            }
          

        }

        const ErrorMessage=()=>{

            if(error)
            {
                return <h4 className="text-danger">Failed to create Category</h4>
            }
        }
        const myCategoryForm=()=>(

            <form>
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input className="form-control my-4"
                input="text"
                autoFocus
                value={name}
                onChange={handleChange}
                required
                placeholder="example:Summer collection"
                
                />

                <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
            </div>
            
            </form>

        )

    return (
        <div>
         <Base title="Create a category here"
               description="Add new category for t-shirt"
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
export default AddCategory;