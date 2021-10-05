import React, {Component} from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
//flash message//
import {toast} from 'react-toastify';
//import browserHistory from 'react-router-dom';
class Show extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isMessage: true,
             images:{},
            comment: '',
            post: {},
            postComment: {},
            detail: '',
            title: '',
        }
        this.changeComment = this.changeComment.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changeComment(e){
        this.setState({
            comment: e.target.value
        })
    }
     
onSubmit=(e)=>{
   e.preventDefault()
     
   let comments = {
       comment: this.state.comment
   };

    // let commentData;
    let sendPostRequest = async ()=>{
     try{
    let commentData = await axios.post(`http://localhost:4000/comment/post/${this.props.match.params.id}`, comments)
  // .then(res=>console.log(res.data.comments))
  
       console.log(commentData)
      
        toast.success('Comment posted')
        this.setState({
            comment: '',
            postComment: commentData.data.comments
        })
   //to redirect 
  // toast.success('Comment posted')
    // this.props.history.push('/about')
}
catch(err){
    console.log(err.response)
} 
}
sendPostRequest();
};



    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                isMessage: false
            })
        }, 3000)

        axios.get(`http://localhost:4000/thePost/${this.props.match.params.id}`)
       // .then(res=>console.log(res.data.image))
         .then(res=>{
             this.setState({
                 post: res.data,
                 images:res.data.image,
                  detail: res.data.detail,
                  title: res.data.title,
             })
               
        })
        .catch(err=>{
            console.log(err)
        })

       //Getting comments//
        axios.get(`http://localhost:4000/comment/post/${this.props.match.params.id}`)
       // .then(res=>console.log(res.data.comments))
          .then(res=>{
              this.setState({
                  postComment:res.data.comments
               
              })
                
         })
         .catch(err=>{
             console.log(err)
         })
    }
    render(){
         const comments = Array.from(this.state.postComment)
         const images= Array.from(this.state.images)

        return(

            <div className="container my-5">
                <h5 className="text-success text-center my-4">{this.state.isMessage? 'Welcome to show page': ''}</h5>
              
                <h5>{this.state.title}</h5>
                <p className="ck-content" dangerouslySetInnerHTML={{__html:this.state.detail}}></p>
              
                {images.slice(0,1).map((val, index)=>{
                    return(
                        <div key={index}>
                        <img src={val} className="postImage" alt=""/>
                       </div>
                    )
                })}
                <h5>Others Images</h5>

                {images.slice(1,3).map((val, index)=>{
                    return(
                        <div key={index}>
                        <img src={val} className="postImage" alt=""/>
                       </div>
                    )
                })}
             
                 {comments.map((val, index)=>{
                     return (
                        <div key={index}>{val.comment} on {dayjs(val.commentDate).format('DD/MM/YY')}</div>

                     )
                 })}
               <div className="container mt-5">
                   <form onSubmit = {this.onSubmit}>
                       <div className="form-group">
                           <label>Comment here</label>
                           <textarea value={this.state.comment} onChange={this.changeComment} placeholder="Comment here..." rows="5" className="form-control"></textarea>
                       </div>
                       <div className="form-group mt-3">
                         <button className="btn btn-success" type="submit" >Post Comment</button>
                       </div>
                   </form>
               </div>
            </div>
        )
    }
}

export default Show;