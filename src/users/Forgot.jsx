import React, {Component} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';


class Forgot extends Component {

    constructor(){
        super()
        this.state={
            email: '',
            users: {},
            forgotMes: false,
        }
        this.changeEmail = this.changeEmail.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


      changeEmail(e){
          this.setState({
          email: e.target.value
          })
      }
componentDidMount(){
    axios.get('http://localhost:4000/users')
    //.then(res=>console.log(res.data))
       .then(res=>{
           this.setState({
               users: res.data,
           })
       })
}
         onSubmit(e){
             e.preventDefault();
             const {users, email} = this.state;
             const filterEmail = users.map(user=>user.email);
             if(filterEmail.includes(email)){
                console.log(filterEmail)
                    let forgot = {
                        email: this.state.email,
                    }
                    this.setState({
                        forgotMes: true,
                    })
                   axios.post('http://localhost:4000/forgot', forgot)
                  // .then(res=>console.log(res.data))
                   .then((res)=>{
                       toast.success('sent forgot')
                       console.log(res.data)
                       this.setState({
                           email:'',
                           forgotMes: false,
                       })
                   }) 
                   .catch((error)=>{
                       console.log(error.response)
                       toast.error('message not sent')
                       this.setState({
                        forgotMes: false,
                       
                    })
                   })
             }else{
                 toast.error('No user with this email found')
                 this.setState({
                     email: '',
                 })
                 return false;
             }  
         }

    render(){

        const users = Array.from(this.state.users);
        return(
               <div className="container mt-5">
                  {users.map((val, index)=>{
                      return(
                          <h5 key={index}>{val.email}</h5>
                      )
                  })} 
                   <h5 className="text-center">Send Reset Link</h5>
                      <h5 className="text-danger"> {this.state.forgotMes? 'Email sending...' : ' ' }</h5>
                   <div className="container">
                    <form onSubmit={this.onSubmit}>
                       
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" value={this.state.email} onChange={this.changeEmail} placeholder="enter mail"/>
                        </div>
                      
                        <div className="form-group mt-3">
                            <button type="submit" className="btn btn-success">Send Reset Link</button>
                        </div>
                    </form>
                   </div>
               </div>
        )
    }
}


export default Forgot;