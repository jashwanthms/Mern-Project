import { API } from "../../backend";
//create a category call

export const Createcategoy=(userId,token,category)=>{

    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },

        body:JSON.stringify(category)
    }).then(response=>{
        return response.json(); 
    }).catch(err=>console.log(err))

};
//get all categories
export const getAllCategories=()=>{

    return fetch(`${API}/categories`,{
        method:"GET"
    })
      .then(response=>{
          return response.json();
      }).catch(err=>console.log(err))
} 

//delete Category
export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  


//create product call
export const CreateProduct =(userId,token,product)=>{
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product

    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log(err);
    })
}


//Get all Products
export const getAllProducts=()=>{
    return fetch(`${API}/products`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

//get a product
export const getAproduct=(productId)=>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    }).catch(err=>console.log(err))
}
//get a category

export const getACategory=(categoryId)=>{
    return fetch(`${API}/category/${categoryId}`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    }).catch(err=>console.log(err))
}

//delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  

//update a product

export const updateProduct =(productId,userId,token,product)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product

    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log(err);
    })
}

//update Category


export const updateCategory =(categoryId,userId,token,category)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({name:category})

    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log(err);
    })
}
