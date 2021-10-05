import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class About extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isMessage: true,
           // currentUser: this.props.currentUser,

        }
    }
     
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                isMessage: false
            })
        }, 3000)
        
      this.setState({
          currentUser: localStorage.getItem('currentUser')
      })
       
    }
    render(){
        
        let current = localStorage.getItem('currentUser')
        let currentUser = JSON.parse(current)       
        let log = localStorage.getItem('logger') 
        return(

            <div className="container my-5">
                           <Link className="" to={`/edit/post/${currentUser? currentUser._id : ''}`}> User</Link>
                  <h5>{currentUser? currentUser.email: ''}{log}</h5>
                 <h5 className="text-success">{currentUser?'you are currently loggedin' : 'you are loggedout'}</h5>
                <h5 className="text-success text-center my-4">{this.state.isMessage? 'Welcome to about page': ''}</h5>
                <h5 className="text-center">About Us</h5>
                <section className="banner text-center mt-4 text-white bg-success">
                   <h4 className="p-4">About Project</h4>
                   <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt culpa possimus assumenda aut reiciendis maiores dolores
                     quae explicabo non doloremque quaerat sed, dignissimos praesentium delectus magni accusamus rem dolore soluta.</p>
                     <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eaque sunt quaerat, ad harum odio 
                         accusamus rerum nam obcaecati autem a, qui iure nesciunt molestias accusantium ut, amet reprehenderit maiores.</p>
               </section>
            </div>
        )
    }
}

export default About;