import React from 'react'
import Menu from './Menu';
const Base=({
    title="My Title",
    description="My Description",
    className=" text-white p-4",
    children
})=> {
    return (
        <div>
        <Menu/>
            <div className="container-fluid mt-4">
            <div className="jumbotron  text-white text-center">
            <h2 className="display-6">{title}</h2>
            <p className="lead">{description}</p>
            </div>
           <div className={className}>
           {children}
           </div>
            </div>
            <footer className="footer  mt-auto py-0">
            <div className="container-fluid bg-success text-white text-center py-0 mt-3 display-8 ">
            <h4>if you have  any queries contact us</h4>
            <button className="btn btn-warning btn-sm rounded-circle">contact Us</button>
            </div>
            <div className="container">
            <span className="text-Muted text-primary">
            An Amazing place to buy<span className="text-white"> T-shirt</span>
            </span>
            </div>            
            </footer>
        </div>
    )
}

export default Base;