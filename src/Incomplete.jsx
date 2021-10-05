import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class Incomplete extends Component {
     
    render(){

        return(

            <div className="container my-5">
                <h1 className="">404</h1>
                 <h5 className="">Oops! The Requested URL Could Not Be Found</h5>
    <p>Sorry the url you are trying to access does not exist or have been removed, name changed or is temporary unavailable.</p>
    <Link to="/"><h5 className="">Back To Home</h5></Link>

            </div>
        )
    }
}

export default Incomplete;