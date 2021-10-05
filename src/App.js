import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import About from './About';
import Contact from './Contact';
import New from './posts/New';
import Show from './posts/Show';
import Edit from './posts/Edit';
import NotFoundPage from './NotFoundPage';
import ServerError from './ServerError';
import Incomplete from './Incomplete';
import EditUser from './users/EditUser';
import Register from './users/Register';
import Login from './users/Login';
import Forgot from './users/Forgot';
//import ResetPass from './users/ResetPass';
import ResetPass from './users/ResetPass';
import Welcome from './users/Welcome';
import Unauthorized from './Unauthorized';
import Paginate from './posts/Paginate';
//flash message//
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {UserContext} from './users/UserContext';
import axios from 'axios';
class App extends Component {
             constructor(){
               super()
               this.state={
                 myPosts: {},
               }
             }

             componentDidMount(){
              axios.get('http://localhost:4000/posts')
              //.then(res=>console.log(res.data))
              .then((res)=>{
                  this.setState({
                      myPosts: res.data,
                  })
              })
              .catch((error)=>{
                  console.log(error.response)
              })
             }
   render(){
     let {myPosts} = this.state;
     let allPosts = Array.from(myPosts)
    let logger = localStorage.getItem('logger')
    let current = localStorage.getItem('currentUser')
    let currentUser = JSON.parse(current)
//to refresh all component add => forceRefresh={true} to browserRouter
    return(
        <div>
          <BrowserRouter forceRefresh={true}>
          <Header/>
          <UserContext.Provider value={{logger, currentUser, allPosts}}>

          <Switch>
          <Route path='/' exact component={Home}/>
        
        <Route path='/about' >{logger? <About/> :  <Redirect to="/unauthorized" /> }</Route>
          {/*<Route path='/about'  component={About}/>*/}
          <Route path='/contact' component={Contact}/>
          <Route path='/new' component={New}/>
          <Route path='/post/:id' component={Show} />
          <Route path='/edit/post/:id' component={Edit}/>
          <Route path='/user/register' component={Register}/>
          <Route path='/user/login' component={Login}/>
          <Route path='/user/forgot-password' component={Forgot}/>
          <Route path='/user/reset-password/:token' component={ResetPass}/>
          <Route path='/user/edit' component={EditUser}/>
          <Route path='/user/welcome' component={Welcome}/>
          <Route path='/paginated' component={Paginate}/>

          <Route path='/error/500' component={ServerError}/>
          <Route path='/error/404' component={Incomplete}/>
          <Route path='/unauthorized' component={Unauthorized}/>
          <Route path='*' component={NotFoundPage}/>
           </Switch>
           </UserContext.Provider>
          </BrowserRouter>
          <ToastContainer position="top-center" className="text-center" autoClose={9000} />
        </div>

    )
   }
}

export default App;
