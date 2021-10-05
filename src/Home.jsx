import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//import mediaImage from './images/ad3.jpg';
//import cardImage from './images/ad1.jpg';
import axios from 'axios';
import Footer from './Footer';
import {toast} from 'react-toastify';
import {UserContext} from './users/UserContext';
class Home extends Component {
 static contextType = UserContext
          constructor(props){
              super(props)
              this.state={
                   posts:{},
                   currentUser:{},
                   logger:'',
                   allPosts:{},
              }
          }

    componentDidMount(){
     let logMessage = sessionStorage.getItem('logMessage');

       if(logMessage){
           toast.success('welcome')
      
       }
       axios.get('http://localhost:4000/posts')
       //.then(res=>console.log(res.data))
       .then((res)=>{
           this.setState({
               posts: res.data,
           })
       })
       .catch((error)=>{
           console.log(error.response)
       })
        
       const context = this.context;
       this.setState({currentUser: context.currentUser, logger: context.logger, allPosts: context.allPosts})
    }
   
    render(){
        // let {user} = this.props.location;
         let posts = Array.from(this.state.posts)
         const {currentUser, logger, allPosts} = this.state;
         console.log(allPosts)
        return(
               
            <div className="Conatiner-fluid mt-5">
               <h3 className="text-center"> My First React Project {currentUser? currentUser.username: ""} {logger}</h3>
               <section className="banner text-center mt-4 text-white bg-success">
                   <h4 className="p-4">About Project</h4>
                {this.props.allPosts}
                   <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt culpa possimus assumenda aut reiciendis maiores dolores
                     quae explicabo non doloremque quaerat sed, dignissimos praesentium delectus magni accusamus rem dolore soluta.</p>
                     <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eaque sunt quaerat, ad harum odio 
                         accusamus rerum nam obcaecati autem a, qui iure nesciunt molestias accusantium ut, amet reprehenderit maiores.</p>
               </section>
               <div className="container-fluid">
                   <div className="row">
                       <div className="col-md-8">
                           <h4 className=" text-center my-4">Main Page</h4>
                           <div className="card-group">
                               {posts.map((val, index)=>{
                                   return(
                              <div className="card" key={index}>
                              <img className="img-card-top" src={val.image[0]} alt=""/> 
                              <div className="card-body">
                           <Link to={`/post/${val._id}`} ><h5 className="card-title">{val.title}</h5></Link>
                            </div>      
                            </div> 
                            )
                            })}
                           
                           
                           </div>
                       </div>
                       <div className="col-md-4 bg-success">
                           <h4 className="text-center my-4">Side Page</h4>
                           {posts.map((val, index)=>{
                               return(
                          <div className="row" key={index}>
                             
                          <div className="col-6">
                             <img className="mediaImages "  src={val.image[0]} alt="" />

                             </div>
                             <div className="col-6">
                             <p>{val.title}</p>
                             </div>
                            
                          </div>
                            )
                           })}
                       </div>

                   </div>
               </div>
               <Footer/>
            </div>
             
        )
    }
}

export default Home;
