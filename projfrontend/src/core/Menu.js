import React,{Fragment} from 'react'
import { Link,withRouter } from 'react-router-dom';
import { signout,isAuthenticated } from '../auth/helper';

const currentTab=(history,path)=>{
    if(history.location.pathname===path)
    {
        return {color:"#6EC72D"}; //active //when you visit that route link will activated
    }else{
        return {color:"#FFFFFF"}; //unactive
    }
}


const Menu=({history})=> {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
            <Link style={currentTab(history,"/")} className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
            <Link style={currentTab(history,"/cart")} className="nav-link" to="/cart">Cart</Link>
            </li>
             {isAuthenticated() && isAuthenticated().user.role===0 &&(
                <li className="nav-item">
                <Link style={currentTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">Dash Board</Link>
                </li>
             )}
             {isAuthenticated() && isAuthenticated().user.role===1 &&(
                <li className="nav-item">
                <Link style={currentTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">Admin Dash Board</Link>
                </li>
             )}
           
           {!isAuthenticated() && (
               <Fragment>
            <li className="nav-item">
            <Link style={currentTab(history,"/signup")}className="nav-link" to="/signup">Sign-up</Link>
            </li>
            <li className="nav-item">
            <Link style={currentTab(history,"/signin")}className="nav-link" to="/signin">Sign-in</Link>
            </li>
            </Fragment>
           )}
               {isAuthenticated() && (
                <li className="nav-item">
                 <span className="nav-link text-warning"
                 onClick={
                     ()=>{
                         signout(()=>{
                             history.push("/")
                         })
                     }
                 }
                 
                 >
                 signout
                 </span>
                </li>
               )}
            </ul>
        </div>
    )
}

export default withRouter(Menu);

/*
export default withRouter(Menu);
it will take all the routes from Router.js
*/

