import React, {Component} from 'react';
//import axios from 'axios';
import {toast} from 'react-toastify';
import axios from 'axios';

class Register extends Component {

    constructor(){
        super()
        this.state={
            username: '',
            email: '',
            password: '',
            password2: '',
            users:[],
           }
        
          this.changeUsername = this.changeUsername.bind(this);
          this.changeEmail = this.changeEmail.bind(this);
          this.changePassword = this.changePassword.bind(this);
          this.changePassword2 = this.changePassword2.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
           this.inputRef = React.createRef()
         
    }

    changeUsername(e){
        this.setState({
            username: e.target.value
        })
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
    changePassword2(e){
        this.setState({
            password2: e.target.value
        })
    }

    /* checkEmail = (getData)=>{
         console.log(getData, 'yes')
         const {posts} = this.state;
         const filterEmail = posts.map(post=>post.title);
         console.log(filterEmail)
         if(getData.includes(filterEmail)){
             alert('nooooooo')
         }else{
             return true;
         }
    }*/
    
    onSubmit(e){
        e.preventDefault()
       // let value = e.target.value;
        // axios.get('http://localhost:4000/posts')
        // .then((res)=>this.checkEmail(res.data))
        
       const {users} = this.state;
       const filterEmail = users.map(user=>user.email);
       const {password, password2, email} = this.state;
       if(password!==password2){
          const error = 'password not coreect';
           console.log(error)
           toast.error('password not coreect')
           this.setState({
            password: '' ,
            password2: '',
        })
        return false;
    }
     if(!password || !password2){
        const error = 'Enter password';
        console.log(error)
        toast.error('Enter password')
        this.setState({
         password: '' ,
         password2: '',
     })
     return false;
    }

    if(password.length < 4 ){
        const error = 'Password must be atleast 4 characters';
        console.log(error)
        toast.error('Password must be atleast 4 characters')
        this.setState({
         password: '' ,
         password2: '',
     })
     return false;

       }
      
       if(filterEmail.includes(email)){
        console.log(filterEmail)

           const error = 'email exist';
           console.log(error)
           toast.error('Email exist')
           this.setState({
            password: '' ,
            password2: '',
            email: '',
        })
        return false;
       }
       else{
        const register={
           
            password: this.state.password,
            password2: this.state.password2,
            email: this.state.email,
            username: this.state.username,
        }
        console.log(register)
        axios.post('http://localhost:4000/register', register)
        .then((res)=>{
            console.log(res.data)
        const success = 'success';
        console.log(success)
        toast.success('Registered successfully')
        this.setState({
            password: '', 
            password2: '',
            email: '',
            username: '',
        })
    })
    .catch((error)=>{
        console.log(error.response)
    })
    }
    }

componentDidMount(){
    this.inputRef.current.focus()
    toast.success('Account successfully verified')
    axios.get('http://localhost:4000/users')
 //.then(res=>console.log(res.data))
    .then(res=>{
        this.setState({
            users: res.data,
        })
    })
}

    render(){
             const users = Array.from(this.state.users)
        return( 
               <div className="container mt-4 ">
                   {users.map((val)=>{
                       return(
                           <h5 key={val._id}>{val.email}</h5>
                       )
                   })} 
                   <h5 className="text-center">Register Account</h5>
                 
                   <div className="container">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" value={this.state.username} onChange={this.changeUsername} placeholder="enter name" ref={this.inputRef}/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control"  value={this.state.email} onChange={this.changeEmail} placeholder="enter mail"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control"  value={this.state.password} onChange={this.changePassword} placeholder="xxxxxxx"/>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control"  value={this.state.password2} onChange={this.changePassword2} placeholder="xxxxxxx"/>
                        </div>
                        <div className="form-group mt-3">
                            <button type="submit" className="btn btn-success">Register</button>
                        </div>
                    </form>
                   </div>
                
               </div>
        )
    }
  
}


export default Register;