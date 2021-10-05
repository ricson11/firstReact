import React, {Component} from 'react';
import {toast} from 'react-toastify';
import {CKEditor} from 'ckeditor4-react'

import Home from './Home';
class Contact extends Component {
    constructor(props){
        super(props)
        this.state={
             detail:'<p>React is realy</p>',
            // mySearch:{},
        }
        this.handleChange = this.handleChange.bind(this)
        this.onEditorChange = this.onEditorChange.bind(this)
    }

onEditorChange(event){
    this.setState({
        detail: event.editor.getData()
    })
}
handleChange(changeEvent){
    this.setState({
        data: changeEvent.target.value
    })
}
    componentDidMount(){
        let logger = localStorage.getItem('logger');
        if(!logger){
            toast.error('login to access this page')
        }
    }

     
    render(){
    let logger = localStorage.getItem('logger');
        if(logger){
        return(

            <div className="container my-5">
                <h5 className="text-center">Contact Us</h5>
                
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Enter your name"/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter your email"/>
                    </div>
                    <div className="form-group mt-3">
                     <button className="btn btn-success">Message</button> 
                    </div>
                </form>
               {/*} <div className="form-group mt-5">
                <textarea name="editor" defaultValue={this.state.data} onChange={this.handleChange} class="form-control" rows="5"></textarea>
                </div>*/}
               {/* <CKEditor value={this.state.detail} onChange={this.onEditorChange}/>*/}
               <CKEditor detail="<p>kkkkkk</p>"/>
            </div>
        )
        }else{
            return(
                <Home/>
            )
        }
    }
}

export default Contact;