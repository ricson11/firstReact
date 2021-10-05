import React, {Component} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
//import ResetPass from './ResetPass'
//import Forgot from './Forgot';

export default class Reset extends Component{

          constructor(){
              super()

              this.state={
                  isValid: false
              }
          }


          componentDidMount(){
            axios.get(`http://localhost:4000/reset/${this.props.match.params.token}`)
          //  .then(res=>console.log(res.data))
            .then((res)=>{
                if(res.data === 'Password reset token is invalid or has expired'){
                    this.setState({
                        isValid: false,
                    })
                    toast.error('Password reset token is invalid or has expired')
                }else{
                    this.setState({
                        isValid: true,
                    })
                    toast.success('You can now reset your email')
                }
                console.log(res.data)
            })
            .catch((error)=>{
                console.log(error.response)
                toast.error('An error occured')
            })
        }


        render(){
            return(
                <div className="container">
                  {/*  {this.state.isValid? <ResetPass/> : <Forgot/>} */}
                </div>
            )
        }

}