import React, {Component} from 'react';
import axios from 'axios';
//import {CKEditor} from 'ckeditor4-react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '../Ckeditor//';
import ClassicEditor from 'ckeditor5/packages/ckeditor5-build-classic/build/ckeditor';

class Edit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isMessage: true,
          
            title: '',
            detail:'',
            image: '',
            
        }
        this.changeTitle = this.changeTitle.bind(this)
        //this.changeDetail = this.changeDetail.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.changeImage = this.changeImage.bind(this)
        this.handleChange =  this.handleChange.bind(this)

    }
     
        
changeTitle(e){
    this.setState({
        title: e.target.value
        
    })
}
    
/*changeDetail(changeEvent){
    this.setState({
       detail: changeEvent.target.value
        
    })
}*/

/*handleChange=(e)=>{
    let data = e.editor.getData();
    this.setState({detail:data})
      console.log(data)
}*/
handleChange=(event, editor)=>{
    let data = editor.getData();
    this.setState({
        detail: data
    })
    console.log(data)
}
      
changeImage(e){
    this.setState({
        image: e.target.files[0]
        
    })
}


 
onSubmit(e){
     e.preventDefault();
    var data = new FormData();
   
       
     data.append('image', this.state.image)
     data.append('title', this.state.title)
     data.append('detail', this.state.detail)
     axios.put(`http://localhost:4000/update/post/${this.props.match.params.id}`, data)
     .then(res=>console.log(res.data))
     
     this.setState({
        title:this.state.title,
        detail: this.state.detail,
        image: this.state.image
     })
    this.props.history.push('/new')
}
  
componentDidMount=()=>{
     
   
    
        setTimeout(()=>{
            this.setState({
                isMessage: false
            })
        }, 3000)

        axios.get(`http://localhost:4000/edit/thePost/${this.props.match.params.id}`)
      //  .then(res=>console.log(res.data.image))
         .then(res=>{
             this.setState({
                 title:res.data.title,
                 detail: res.data.detail,
                  image: res.data.image
             })
               
        })
        .catch(err=>{
            console.log(err)
        })

      
    }
   
    render(){
          const image = Array.from(this.state.image);
       
        return(

            <div className="container my-5">
                <h5 className="text-success text-center my-4">{this.state.isMessage? 'Welcome to about page': ''}</h5>
                <h5 className="text-center">About Us</h5>
                <h5 className="text-center">Create New Post</h5>

   <form onSubmit={this.onSubmit}>
    <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" placeholder="Enter your title" 
        value={this.state.title} onChange={this.changeTitle}/>
    </div>
    <div className="form-group">
        <label>Email</label>
       
      {/* <textarea className="form-control" name="editor1" id="editor1" placeholder="Enter your detail"
        value={this.state.detail} onChange={this.changeDetail}></textarea>*/}
        <CKEditor  editor={ClassicEditor} data={this.state.detail} onChange={this.handleChange} config={{}}  /> 
  

    </div>
    <div className="form-group">
        <label>Uploaded Images</label>
        {image.map((val, index)=>{
            return(
                <div key={index} className="container">
          <img src={val} className="postImage" alt=""/>
             </div>
            )
        })}
    </div>
    <div className="form-group mt-2">
         <label>upload</label>
         <input type="file" defaultValue={this.state.image} onChange={this.changeImage} className="form-control"/>
         </div>
    <div className="form-group mt-3">
     <button className="btn btn-success" type="submit">Post</button> 
    </div>
       </form>
            </div>
        )
    }
}

export default Edit;