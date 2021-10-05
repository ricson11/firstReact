const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const PostSchema = new Schema({
      
    title:{
        type: String
    },

    detail:{
        type: String,
    },
    image: [{
        type: String
    }],

   

   comments:[{
       comment:{
           type: String,
       },
       commentDate:{
           type: Date,
           default: Date.now
       }
   }],
    createdAt:{
        type: Date,
        default: Date.now
    },
});


module.exports = Post = mongoose.model('posts', PostSchema);