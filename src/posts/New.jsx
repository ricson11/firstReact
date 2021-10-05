import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import {toast} from 'react-toastify';
//import {CKEditor} from 'ckeditor4-react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5/packages/ckeditor5-build-classic/build/ckeditor';

import ReactPaginate from 'react-paginate';
//import {CKEditor} from 'ckeditor'
//import {CKEditor} from '@ckeditor/ckeditor5-react';
//import classicEditor from '@ckeditor/ckeditor5-build-classic';
//import ckFinder from '@ckeditor/ckeditor5-ckfinder';
//import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import '../App.css';

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)
//load ckeditor locally//
//CKEditor.editorUrl = 'http://localhost:3000/ckeditor4-react/dist/ckeditor.js';

class New extends Component {
   
    constructor(){
         super()
         this.state = {
               title: '',
               detail: '',
               image: '',
               isMessage: false,
               isDeleted: false,
               posts:{},
               search: '',
               mySearch:{},
               searchFound: '',
               searchNotFound: '',
               showPage: true,
               pageNumber: 0,
               //setPageNumber:0,
               
         }
         this.changeTitle = this.changeTitle.bind(this)
         this.changeSearch = this.changeSearch.bind(this)
         this.onSearch = this.onSearch.bind(this)
        // this.changeDetail = this.changeDetail.bind(this)
         this.changeImage = this.changeImage.bind(this)
          this.onSubmit = this.onSubmit.bind(this)
         this.deletePost = this.deletePost.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

changeSearch(e){
    this.setState({
        search: e.target.value
    })
}
    
onSearch(e){
    e.preventDefault();
    let {posts, search} = this.state;
   let check =  posts.filter((post=>post.title.includes(search)))
   let checkDetail =  posts.filter((post=>post.detail.includes(search)))
   console.log(check)
   console.log(checkDetail)
   console.log(search)
   if(check.length > 0){
    let success = 'Content  found';
    console.log(success)
    toast.success(` search result for ${search} found`)
    
   }else{
   
    let error = 'Content not found';
    console.log(error)
   toast.error(`No search result for ${search} found`)
   this.setState({
       search: '',
       searchNotFound: `No search result for ${search} found`
   })
   return false;
   }
  
    let result = posts.filter(post=>post.title.includes(search))
    console.log(result)
  
     this.setState({
         mySearch: result,
          searchFound: `Search result for ${search} found`,
          showPage: false,
     })
   /* this.props.history.push({
        pathname: '/contact',
        state:{mySearch: this.state.mySearch, from: this.props.location}
    })*/
}

changeTitle(e){
    this.setState({
        title: e.target.value
    })
}
    
/*handleChange(e){
    let data = e.editor.getData();
     this.setState({
         detail: data
     })
     console.log(data)
}*/

/*changeDetail(changeEvent){
    this.setState({
        detail: changeEvent.target.value
    })
}
 /*handleChange=(e)=>{
     let target = e.target;
     let [name, value] = target;
     this.setState({
         [name]: value
     });
 } */
 handleChange=(event, editor)=>{
     let data = editor.getData();
     this.setState({
         detail: data
     })
     console.log(data)
 }


    
changeImage(e){
    if(this.maxSelectFile(e) && this.checkMimeType(e) && this.checkFileSize(e)){
    this.setState({
        image: e.target.files
    })
}
}


handleClick=(e)=>{
    const pageSelected = e.selected;
    this.setState({pageNumber:pageSelected})
    window.scrollTo(0, 0)      

}

//upload image functions//

maxSelectFile=(e)=>{
    let files = e.target.files // create file object
        if (files.length > 3) { 
           const msg = 'Only 3 images can be uploaded at a time'
           toast.error('Only 3 images can be uploaded at a time')
           e.target.value = null // discard selected file
           console.log(msg)
          return false;
 
      }
    return true;
 
 }


 checkMimeType=(e)=>{
    //getting file object
    let files = e.target.files 
    //define message container
    let err = ''
    // list allow mime type
   const types = ['image/png', 'image/jpg', 'image/jpeg' ]
    // loop access array
    for(var i = 0; i<files.length; i++) {
     // compare file type find doesn't matach
     //eslint-disable-next-line
         if (types.every(type => files[i].type !== type)) {
         // create error message and assign to container   
         err += files[i].type+' is not a supported format\n';
         toast.error( files[i].type+' is not a supported format\n')
       }
     };
  
   if (err !== '') { // if message not same old that mean has error 
        e.target.value = null // discard selected file
        console.log(err)
         return false; 
    }
   return true;
  
  }

  checkFileSize=(e)=>{
    let files = e.target.files
    let size = 1000000  //1mb 
    let err = ""; 
    for(var i = 0; i<files.length; i++) {
    if (files[i].size > size) {
     err += files[i].type+'is too large, please pick a smaller file\n';
     toast.error(files[i].type+'is too large, please pick a smaller file\n')
   }
 };
 if (err !== '') {
    e.target.value = null
    console.log(err)
    return false
}

return true;

}



    onSubmit=async(e)=>{
        
        e.preventDefault()
        let data = new FormData();
        //multiple image upload//
        const {image} = this.state;
        for(let i = 0; i <image.length; i++){
        data.append('image', image[i])
        console.log(image[i])
        
        }
       
       data.append('title', this.state.title)
       data.append('detail', this.state.detail)
       
         console.log(this.state.image)

       let postData;
       try{
       postData = await axios.post('http://localhost:4000/post', data)
      
        console.log(postData)
        //Get post immediately after submitting using push//
        const posts = [...this.state.posts]
        posts.unshift(postData.data)
        this.setState({
            title: '',
            detail: '',
            image: '',
            isMessage: true,
            posts: posts
        })

    setTimeout(()=>{
        this.setState({
            isMessage: false
        })
    }, 3000)
      
        }catch(err){
            console.log(err.response)
            postData = err.response;
            //console.log(postData.status)
            if(postData.status === 404){
           return this.props.history.push('/error/404')
            }else{
                return this.props.history.push('/error/500')
            }
        }
         
      
    
     }
   
    
    componentDidMount=async()=>{
        try{
       await axios.get('http://localhost:4000/posts')
       //.then(res=>console.log(res.data))
        .then(res=>{
          
            this.setState({
                posts:res.data
             
            })
           
        })
    }
    catch(err){
        console.log(err.message)
    }

  /*  await axios.post('http://localhost:4000/upload')
    .then(res=>console.log(res.data))
   */

 }
    


deletePost(id){
    axios.delete('http://localhost:4000/delete/post/'+id)
    .then(res=>console.log(res.data))
      this.setState({posts: this.state.posts.filter(el=>el._id!==id), isDeleted: true})
      setTimeout(()=>{
        this.setState({
            isDeleted: false
        })
    }, 3000)
     
  
}



    render(){

          const {pageNumber} = this.state;
      

        const posts = Array.from(this.state.posts);

        const postPerPage = 2;
        const pageVisited = pageNumber * postPerPage;
        const displayPosts = posts
        .slice(pageVisited, pageVisited + postPerPage)
        .map((post)=>{
            return(

                <div  className="container" key={post._id} >
                     <Link className="" to={`/post/${post._id}`}> <h4>{post.title.substring(0, 10)} ...</h4></Link>
                           <Link className="" to={`/edit/post/${post._id}`}> Edit</Link> 
                         <Link className="" to={`/delete/post/${post._id}`}> Delete</Link>
                            <Link to="#" onClick={()=>{this.deletePost(post._id)}}>Delete</Link>

     
                            
                           <h4 className="ck-content" dangerouslySetInnerHTML={{__html:post.detail}}></h4>
                           
                    <img src={post.image[0]} className="postImage" alt=""/> 
                      
                            <h4>{dayjs(post.createdAt).fromNow()}</h4>
                            <h4>{dayjs(post.createdAt).format('DD/MM/YYYY, h:mm a')}</h4>

                </div>
            );
        });

        const pageCount = Math.ceil(posts.length / postPerPage);
      /*  const changePage = ({selected})=>{
            console.log(selected)
        this.setState({pageNumber: selected})
        window.scrollTo(0, 0)      
      }*/

        
            // const posts = Object.values(this.state.posts);
              // var stripTags = this.replace(/(<([^>]+)>)/ig, " ");
              
           /*  function strip(html){
                 var tmp = document.implementation.createHTMLDocument("new").body;
                 tmp.innerHTML =html;
                 return tmp.textContent || tmp.innerText || " ";
             }*/
           
          let searches = Array.from(this.state.mySearch);
          //  let { searchFound} = this.state; 
          if(this.state.showPage){
        return(
            
            
         <div className="container-fluid my-5">

            <div className="">
                 {displayPosts}
                 <ReactPaginate
                 previousLabel={"prev"}
                 nextLabel = {"Next"}
                 pageCount = {pageCount}
                 onPageChange = {this.handleClick}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={0}
                 containerClassName={"paginationBttns"}
                 previousLinkClassName={"previousBttn"}
                 nextLinkClassName={"nextBttn"}
                 disabledClassName={"paginationDisabled"}
                 activeClassName={"paginationActive"}
                 />
                 </div>


     <h5 className="text-success text-center">{this.state.isMessage? 'Posted' : ' '}</h5>
     <h5 className="text-success text-center">{this.state.isDeleted? 'Post deleted' : ' '}</h5>

              <h5 className="">Search</h5>
              <form onSubmit={this.onSearch}>
                  <input type="search" className="form-control" value={this.state.search} onChange={this.changeSearch}/>
               <button className="btn btn-primary" type="submit">Search</button>
              </form>
         
                <h5 className="text-center">Create New Post</h5>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Enter your title" 
                        value={this.state.title} onChange={this.changeTitle}/>
                    </div>
                   {/* <div className="form-group">
                        <label>Email</label>
                       <textarea name="detail" className="form-control" placeholder="Enter your detail" rows="5"
                        defaultValue={this.state.detail} onChange={this.changeDetail}></textarea> 
                      </div>*/}
        <CKEditor  editor={ClassicEditor} data={this.state.detail} onChange={this.handleChange}  config={{}}  /> 
                   {/* <CKEditor editor={classicEditor}
                     onReady={editor=>{editor.ui.view.editable.element.style.height='200px';}} 
                      onChange={this.handleCkeditor}  config={ {removePlugins:["EasyImage","ImageUpload","MediaEmbed"], extraPlugins:[] }}  />
                    */}
                   {/*<Editor initialContentState={content} editorContent={detail} editorState={this.state.detail} onEditorStateChange={this.onEditorStateChange} toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName" editorClassName="editorClassName"
                     />*/}
                    <div className="form-group">
                        <label>upload</label>
                        <input type="file" defaultValue={this.state.image} multiple onChange={this.changeImage} className="form-control"  />
                      </div>
                    <div className="form-group mt-3">
                     <button className="btn btn-success" type="submit" >Post</button> 
                    </div>
                </form>
              
               
                
                <div className="container my-5">
                    <h5 className="text-center">{this.state.title}</h5>
                </div>
                
             {/*  {posts.map((post, index)=>{

                    return(
                        <div key={index} className="container">
                          <Link className="" to={`/post/${post._id}`}> <h4>{post.title.substring(0, 10)} ...</h4></Link>
                           <Link className="" to={`/edit/post/${post._id}`}> Edit</Link> 
                         <Link className="" to={`/delete/post/${post._id}`}> Delete</Link>
                            <Link to="#" onClick={()=>{this.deletePost(post._id)}}>Delete</Link>

     
                            
                           <h4>{post.detail.replace(/(<([^>]+)>)/ig, " ")}</h4>
                    <img src={post.image[0]} className="postImage" alt=""/> 
                      
                            <h4>{dayjs(post.createdAt).fromNow()}</h4>
                            <h4>{dayjs(post.createdAt).format('DD/MM/YYYY, h:mm a')}</h4>

                    
                       
                    
                         </div>
                     
                    )
                })}*/}
              
    
            </div>
            
        )
         }else{
             return(
                 <div className="">
                <div className="container my-3">
                   
                   {searches? (
                       <h5 className="text-danger text-center">{this.state.searchFound}</h5>
                   ): ''}
                    {searches.map((search, index)=>{
                        return(
                            <div key={index} className="container">
                                <Link to={`post/${search._id}`}><h5 className="text-center">{search.title}</h5></Link>
                                </div>
                        )
                    })}
                 </div>
                 </div>
             )
         }
    }
}

export default New;