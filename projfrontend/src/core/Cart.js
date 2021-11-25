import React,{useEffect,useState} from 'react'
import { API } from '../backend';
import "../styles.css";
import Base from './Base';
import Card  from './Card';

import { LoadCart } from './helper/cartHelper';
import StripeCheckout from './StripeCheckout';
const Cart=()=> {
   
        const [products,setProducts]=useState([]);   
        const [reload,SetReload]=useState(false)
        
              useEffect(()=>{
                 setProducts(LoadCart())
              },[reload])

        const LoadAllProducts=()=>{
            return (
                <div>
                <h1>This  Section is to load the products</h1>
                {
                    products.map((product,index)=>(
                         <Card
                         key={index}
                         product={product}
                         removeFromCart={true}
                         addtoCart={false}
                         SetReload={SetReload}
                         reload={reload}
                         
                         />
                      
                    ))
                }
            </div>
            )
        }

        

        const CheckOutProducts=()=>{
            return (
                <div>
                <h1>This  Section is to CheckOut the products</h1>
            </div>
            )
        }


    return (
        <Base title="Cart Page" description="Ready To Check out">
            <div className="row text-center">
            <div className="col-6">
            {LoadAllProducts()}
            </div>
         <div className="col-6">
        <StripeCheckout
        products={products}
        SetReload={SetReload}
       
        />
         </div>
            </div>
        </Base>
    )
}

export default Cart;

/*
Here Base acts as a parent to the other components
so base will always be there even if we route to other pages 
*/
