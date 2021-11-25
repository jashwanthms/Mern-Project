import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router';
import { AddItemToCart, RemoveItemFromCart } from './helper/cartHelper';
import Imagehelper from './helper/Imagehelper';

    const Card = ({
        product,
        addtoCart=true,
        removeFromCart=false,
        SetReload=function(f){return f},
        reload=undefined

    }) => {

        const [redirect,SetRedirect]=useState(false);
        const [count,SetCount]=useState(product.count);
               const cardtitle=product?product.name:"A Default Title"
               const carddescription=product?product.Description:"A Default Title"
               const cardprice=product?product.price:"A Default Title"


               const AddtoCart=()=>{
                   AddItemToCart(product,()=>{SetRedirect(true)})
               }

        const getaRedirect=(redirect)=>{

            if(redirect)
            {
                  return <Redirect to="/cart"/>
            }
        }        
        
           const ShowAddToCart=(addtoCart)=>{
             return(
               addtoCart&& <button
                onClick={AddtoCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
             )
           }

           const ShowRemoveFromCart=(removeFromCart)=>{
                    return(
                     removeFromCart&&   <button
                        onClick={()=>{
                          RemoveItemFromCart(product._id)
                          SetReload(!reload)
                        }}
                        className="btn btn-block btn-outline-danger mt-2 mb-2"
                      >
                        Remove from cart
                      </button>
                    )
           }
        return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cardtitle}</div>
            <div className="card-body">
            {getaRedirect(redirect)}
             <Imagehelper product={product}/>
              <p className="lead bg-success font-weight-normal text-wrap">
                {carddescription}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">$ {cardprice}</p>
              <div className="row">
                <div className="col-12">
               {ShowAddToCart(addtoCart)}
                </div>
                <div className="col-12">
                 {ShowRemoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };

  export default Card;
