const express = require('express');
const moment = require('moment');
const router = express.Router();
const fs = require('fs');
const cloudinary = require('cloudinary')
require('../models/Post');
const upload = require('../middleware/multer');
const uploadMethod = require('../middleware/uploadMethod');
const path = require('path')
//const multiparty = require('connect-multiparty')
//const multipartyMiddleware = multiparty({uploadDir:'./public/uploads'})





router.post('/post', upload.array('image'), async(req, res)=>{
    try{
    //cloudinary.v2.uploader.upload(req.file.path, {folder: 'zenith'}, (err, result)=>{
    // if (err) throw err;
        console.log(req.files)
        const urls = [];
     const files = req.files;
     for(const file of files){
         const {path} = file;
         const newPath = await uploadMethod(path)
         urls.push(newPath)
        fs.unlinkSync(path)
     } 
        let newPost = {
            image: urls.map(url=>url.result),
            title: req.body.title,
            detail: req.body.detail,
           
           
          
        }
          console.log(newPost)
         Post.create(newPost)
         .then(data=>{
             res.json(data)
         })
        .catch(err=>{
            res.json(err)
        })
    }
    catch(err){
        console.log(err.message)
    }
    })
     





 router.get('/posts', (req, res)=>{
     Post.find({}).sort({createdAt:-1})
     .then(posts=>res.json(posts))
     .catch(err=>res.status(400).json('error:' + err));
 });

 


 router.get('/thePost/:id',async(req, res)=>{
     try{
          await Post.findOne({_id: req.params.id})
          .then(data=>res.json(data))
          .catch(err=>res.status(400).json('Error:' + err));
     }
     catch(err){
         console.log(err.message)
     }
 })



 //edit page


 

 router.get('/edit/thePost/:id',async(req, res)=>{
    try{
         await Post.findOne({_id: req.params.id})
         .then(post=>res.json(post))
         .catch(err=>res.status(400).json('Error:' + err));
    }
    catch(err){
        console.log(err.message)
    }
})

//update route//

router.put('/update/post/:id', upload.array('image'), async(req, res)=>{
     try{
          
          const urls = [];
        const files = req.files;
        for(const file of files){
            const {path} = file;
            const newPath = await uploadMethod(path)
            urls.push(newPath)
           fs.unlinkSync(path)
        } 
         await Post.findOne({_id:req.params.id})
        // console.log(req.files)
        
         .then(post=>{
             post.title = req.body.title,
             post.detail = req.body.detail,
             post.image = urls.map(url=>url.result),

             console.log(post)
             post.save()
             .then(post=>res.json(post))
             .catch(err=>res.status(400).json('Error:' + err))
         })
     }
     catch(err){
         console.log(err.message)
     }
})

router.delete('/delete/post/:id', async(req, res)=>{
    try{
       Post.findByIdAndDelete(req.params.id)
       .then(()=>res.json('Posted deleted'))
       .catch(err=>res.status(400).json('Error:'+ err));
       
    }
    catch(err){
        console.log(err.message)
    }
})


//commenting//

router.post('/comment/post/:id', async(req, res)=>{
      try{
        await Post.findOne({_id: req.params.id})
        .then(post=>{
          let newComment = {
              comment:req.body.comment
          }

           post.comments.unshift(newComment)
            console.log(post)
            post.save()
            .then(data=>res.json(data))
            .catch(err=>res.status(400).json('Error:' + err))
        })

      }
      catch(err){
          console.log(err.message)
      }
});


router.get('/comment/post/:id', async(req, res)=>{
    try{
    await Post.findOne({_id:req.params.id})
    .then(postComment=>res.json(postComment))
    .catch(err=>res.status(400).json('Error:' + err))
}
catch(err){
    console.log(err.message)
}
})


router.get('/search', async(req, res)=>{
         let {query} = req.query;
         console.log(req.query)
         console.log(req.body)
         let  q = new RegExp(query, 'i')
         await Post.find({$or:[{title:q}]}).sort({createdAt:-1})
         .then(res=>res.json(data))
         .catch(err=>res.status(400).json('Error' + err))


})


module.exports = router;