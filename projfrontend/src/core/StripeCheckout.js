import React,{useState,useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { emptyCart,LoadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';
import { CreateOrder } from './helper/orderhelper';
import { Redirect } from 'react-router';

const StripeCheckout=(
    {
        products,
        setReload=function(f){return f},
        reload=undefined
    }
)=> {
       
    const [data,SetData]=useState({
        loading:false,
        success:false,
        error:"",
        address:""
    })
    
   var myres=undefined;
    const token=isAuthenticated() && isAuthenticated().token;
    const userId=isAuthenticated() && isAuthenticated().user_id;

    const getFinalAmount=()=>{
        let amount=0;
        products.map(p=>{
            amount=amount+p.price;
        })
        return amount;
    }
const makePayment=()=>{
    const body={
        token,
        products
    }

    const headers={
        "Content-Type":"application/json"
    }

    return fetch(`${API}/stripepayment`,{
        method:"POST",
        headers,
        body:JSON.stringify(body)
    }).then(response=>{
        console.log(response);
        const {status}={response}
      emptyCart(()=>{
          console.log("Got a crash?");
      })
     response ? setReload(!reload): console.log("Noreload")
      
    }).catch(err=>{
        console.log(err);
    })
}

const ShowStripeButton=()=>{
    return(
        isAuthenticated() ?(
          <StripeCheckoutButton
          stripeKey="pk_test_51JdU38SFNfnTTvGiMvgz2FjWYvsSNDerqy7tN2uR2KAJF1JS986tjECWl2yOM0uBvtMIuWhD0DgxWbNAIzJ1MPds00bGVgWjop"
          token={makePayment}
          amount={getFinalAmount()*100}
          name="Buy T shirts"
          shippingAddress
          billingAddress
          
          >
          <button className="btn btn-success">Pay With Stripe</button>
          </StripeCheckoutButton>
        ):(
           <Link to="/signin">SignIn</Link>
        )
    )
}

   

    return (
        <div>
            <h1 className="text-center">Stripe Checkout {getFinalAmount()}</h1>
          {ShowStripeButton()}
           
          </div>
    )
}

export default StripeCheckout;