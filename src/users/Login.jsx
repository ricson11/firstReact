import React, {Component} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import {Link} from 'react-router-dom';
//import Home from '../Home';
class Login extends Component {

    constructor(){
        super()
        this.state={
            username: '',
            email: '',
            password: '',
            users:[],
            logger: false,
            logMessage: false,
           }
        
          this.changeEmail = this.changeEmail.bind(this);
          this.changePassword = this.changePassword.bind(this);
           this.inputRef = React.createRef();
           this.onSubmit = this.onSubmit.bind(this)
         // this.logOut = this.logOut.bind(this)
    }


    changeEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    changePassword(e){
        this.setState({
            password: e.target.value
        })
    }
   
componentDidMount(){
       this.inputRef.current.focus();
       axios.get('http://localhost:4000/users')
      // .then(res=>console.log(res.data))
       .then((res)=>{
           this.setState({
               users: res.data
           })
       })
       .catch((error)=>{
           console.log(error.response)
       })
     
}


          onSubmit(e){
                  e.preventDefault();
                 const {users, email} = this.state;
                const checkEmail = users.map(user=>user.email)
                if(checkEmail.includes(email)){
                  
                  console.log(checkEmail)
          
                      
                    let Login = {
                        email: this.state.email,
                        password: this.state.password
                    }

                     axios.post('http://localhost:4000/login', Login)
                     //.then(res=>console.log(res.data)) 
                     .then(res=>{
                         console.log(res.data)
                         if(res.data === 'Incorrect password'){
                             toast.error('Incorrect password')
                             this.setState({
                                email: this.state.email,
                                password: ''
                            })
                         }else{
                             toast.success('loggedin')
                             const {logger, logMessage} = this.state;
                             this.setState({
                                  
                               logger: true,
                                currentUser: localStorage.setItem('currentUser', JSON.stringify(res.data)),
                                log: localStorage.setItem('logger', logger),
                                logMessage: true,
                                logMess: sessionStorage.setItem('logMessage', logMessage),
                            })
                            //reload apage when redirecting to update logger whether true or
                            // not and set time out to redirect after one seconds//
                            window.setTimeout(()=>{
                                window.location.href="/"
                               // this.props.history.push({pathname:'/'})
                            }, 1500);
                          
                            //this.props.history.push({pathname:'/', user: 'des'})

                         }
                     })
                     .catch(error=>console.log(error.response))
                }
                else{
                    console.log(checkEmail)
                    const error = 'No user with this email found';
                    console.log(error);
                    toast.error('No user with this email found')
                    this.setState({
                        email: '',
                        password: '',
                    })
                    return false;
                }
                
          }
           //logout//

         /* logOut(){
            localStorage.removeItem('currentUser')
            localStorage.removeItem('logger')
            toast.success('logged out')
          //reload apage when redirecting to update logger whether true or not//
           window.location.href="/"
          }*/

    render(){
        let users = Array.from(this.state.users)
      
       let log = localStorage.getItem('logger')
         let current = localStorage.getItem('currentUser')
         let currentUser = JSON.parse(current)
          
        return(
            
               <div className="container mt-5">
                  
                   <h5 className="text-center">Login Account</h5>
                  {users.map((val, index)=>{
                      return(
                          <h5 key={index}>{val.email}</h5>
                      )
                  })}
                  <h5>{this.state.logger?'yes boss' : 'no'}</h5>
                  <h5 className="text-success">{log?'you are currently loggedin' : 'you are loggedout'}</h5>
                  <h5>{currentUser? currentUser.email: ''}</h5>

                  <h5>{currentUser? currentUser.username : ''}</h5>
                 
                  <Link to="#" onClick={this.logOut}>logOut</Link>

                   <div className="container">
                    <form onSubmit={this.onSubmit}>
                      
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control"  value={this.state.email} onChange={this.changeEmail} placeholder="enter mail" ref={this.inputRef} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control"  value={this.state.password} onChange={this.changePassword} placeholder="xxxxxxx"/>
                        </div>
                       
                        <div className="form-group mt-3">
                            <button type="submit" className="btn btn-success">Login</button>
                        </div>
                    </form>
                   </div>
               </div>
        )
    }
}


export default Login;