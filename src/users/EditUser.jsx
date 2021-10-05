import React, {Component} from 'react';
//import axios from 'axios';
import {toast} from 'react-toastify';


class EditUser extends Component {

    constructor(){
        super()
        this.state={
            name: '',
            email: '',
            password: '',
            password2: '',
           }
        
          this.changeName = this.changeName.bind(this);
          this.changeEmail = this.changeEmail.bind(this);
          this.changePassword = this.changePassword.bind(this);
          this.changePassword2 = this.changePassword2.bind(this);
         // this.onSubmit = this.onSubmit.bind(this);
           this.inputRef = React.createRef()
         
    }

    changeName(e){
        this.setState({
            name: e.target.value
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

componentDidMount(){
    this.inputRef.current.focus()
    toast.success('Account successfully verified')
}

    render(){
         
             
        return( 
               <div className="container mt-4 ">
                   
                   <h5 className="text-center">Register Account</h5>

                   <div className="container">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" value={this.state.name} onChange={this.changeName} placeholder="enter name" ref={this.inputRef}/>
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


export default EditUser;