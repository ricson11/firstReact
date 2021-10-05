import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'
class Header extends Component {

  logOut(){
    window.location.reload(true);
    localStorage.removeItem('currentUser')
    localStorage.removeItem('logger')
    sessionStorage.removeItem('logMessage');

    toast.success('logged out')
  //reload apage when redirecting to update logger whether true or not//
  // window.location.href="/"
  }
   
    render(){
let logger = localStorage.getItem('logger')
        return(
    
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbarNav">
  <div className="container-fluid ">
    <Link className="navbar-brand" to="/">MYPDF</Link>

    <button className="navbar-toggler "  type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" ></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 stopIt" id="stopIt">
        <li className="nav-item">
          <Link className="nav-link active" to="/">Home</Link>
        </li>
       
        <li className="nav-item">
          <Link className="nav-link" to="/about" >ABout Us</Link>
        </li>
         {logger? 
         <li className="nav-item">
         <Link to="#" onClick={this.logOut} className="nav-link">logOut</Link>
        </li>
        :
         <li className="nav-item">
          <Link className="nav-link active"  to="/user/login">Login</Link>
        </li>
       }
        <li className="nav-item">
          <Link className="nav-link" to="/new">Create Post</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact" >Contact</Link>
        </li>
         
      
      </ul>
     
    </div>
  </div>
</nav>


        )
    }
}

export default Header;