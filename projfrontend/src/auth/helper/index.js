import {API} from "../../backend";

//API Means:http://localhost:7000/api

/*
in this application we will talk to the backend via fetch(function/Api) call it is same
as fetch (function/api) what we used in javascript to fetch some information from otherdatabases
(ex:Random Joke Generator )
*/

export const signup =user=>{

     return fetch(`${API}/signup`,{
         method:"POST",
         headers:{
             Accept:"application/json",
             "Content-Type":"application/json"
         },

         body:JSON.stringify(user)
     })
     .then(
         response=>{
             return response.json();
         }
     )
     .catch(err=>console.log("what",err));


};


export const signin =user=>{

    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:"applicatio/json",
            "Content-Type":"application/json"
        },

        body:JSON.stringify(user)
    })
    .then(
        response=>{
            return response.json();
        }
    )
    .catch(err=>console.log(err));


};


export const authenticate=(data,next)=>{
    if(typeof window !== undefined)
    {
        localStorage.setItem("jwt",JSON.stringify(data));
        next();
    }
}


export const signout =next=>{

    if(typeof window !== undefined)
    {
        localStorage.removeItem("jwt");
        next();
    }
       return fetch(`${API}/signout`,{
           method:"GET"
       })
       .then(response=> console.log("Sign out success"))
       .catch(err=>console.log(err))
};



export const isAuthenticated=()=>{

    if(typeof window == undefined)
    {
            return false;
    }
    if(localStorage.getItem("jwt"))
    {
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false;
    }
}

/*
in export const isAuthenticated we will check wheher window object is present or not
as we are inserting jwt token inside window object 

if jwt token is present in windowobject we will send that jwt to frontend so that we can
verify it from the front-end as well

*/