import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import Login from './users/Login';
export default class Unauthorized extends Component {
               
    componentDidMount(){
            toast.error('Unauthorized login to access this page')
     }
        render(){
            return(
             <Login/>
            )
        }
}