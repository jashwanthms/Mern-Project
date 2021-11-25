import React,{useEffect,useState} from 'react'
import { API } from '../backend';
import "../styles.css";
import Base from './Base';
import Card  from './Card';
import { getProducts } from './helper/coreapicalls';
export default function Home() {
    const [products,setProducts]=useState([])
    const [error,SetError]=useState(false)

 const loadAllProduct=()=>{
 
    getProducts().then(data=>{
        if(data.error)
        {
            SetError(data.error);
        }else{
            setProducts(data)
        }
    }).catch()

 }

 useEffect(()=>{
    loadAllProduct()
 },[])

    return (
        <Base title="Home Page">
            <div className="row text-center">
            <h1 className="text-white">All of products</h1>
          <div className="row">
          
          {
              products.map((product,index)=>{
                  return(
                      <div key={index} className="col-3 mb-4">
                      <Card product={product}/>
                      </div>
                  )
              })
          }
          </div>
         
            </div>
        </Base>
    )
}

/*
Here Base acts as a parent to the other components
so base will always be there even if we route to other pages 
*/
