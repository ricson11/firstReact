import React, {Component} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import Forgot from './Forgot';

class ResetPass extends Component {

    constructor(){
        super()
        this.state={
            
            password: '',
            password2: '',
            isValid: false,
        }

      
        this.changePassword = this.changePassword.bind(this)
        this.changePassword2 = this.changePassword2.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changePassword(e){
          this.setState({
            password: e.target.value
           
        })
    
    }
    changePassword2(e){
        this.setState({
            password2: e.target.value
        })

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

    onSubmit(e){
        e.preventDefault()
       // let value = e.target.value;
       
       const {password, password2} = this.state;
       if(!password || !password2){
        toast.error('You cannot submit empty input')
        return false;
    }
       if(password.length <4){
           toast.error('Password must be atleast 4 characters')
           this.setState({
               password: '',
               password2: ''
           })
           return false;
       }
       if(password!==password2){
           toast.error('password do not match')
           this.setState({
            password: '',
            password2: ''
        })
       }else{
        const reset={
           
            password: this.state.password,
            password2: this.state.password2
        }
        console.log(reset)
        toast.success('working')
        axios.post(`http://localhost:4000/reset/${this.props.match.params.token}`, reset)
       // .then(res=>console.log(res.data))
        .then((res)=>{
        this.setState({
            password: '', 
            password2: '',
        })
       })
       .catch((error)=>{
           console.log(error.response)
           toast.error('An error occurred')
       })
       //axios end//
    }
    }

    render(){
          if(this.state.isValid){
        return(
             
               <div className="container mt-5">
                   <h5 className="text-center">Reset Account</h5>
                   <div className="container">
                     <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password"  className="form-control"  value={this.state.password} onChange={this.changePassword} placeholder="xxxxxxx"/>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password"  className="form-control"  value={this.state.password2} onChange={this.changePassword2} placeholder="xxxxxxx"/>
                        </div>
                        <div className="form-group mt-3">
                            <button type="submit" className="btn btn-success">Reset</button>
                        </div>
                    </form>
                   </div>
               </div>
        )
        }else{
            return(
                <div className="container">
                    <Forgot/>
                </div>
            )
        }
    }
}


export default ResetPass;