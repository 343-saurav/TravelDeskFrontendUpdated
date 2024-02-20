import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './Home.css'
import img from './img34.jpg';

const Home = () => {
  return (
    <>
      <div className="containerhome">
        <div className="row">
  
    <div className="col-md-6 image-side">
      <img class="img-fluid" src={img} alt="Background Image"/>
    </div>
    <div className="col-md-6 text-side">
      <h1>Hi, welcome!</h1>
      <p>This is home page. Feel free to explore .</p>
    </div>
    </div>
    </div>
      
    
    </>
      
    
  )
}

export default Home
