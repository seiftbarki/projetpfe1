const mongoose = require ("mongoose");
const PostSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : "user"
  },
  
  title: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now(),
},

  description: {
    type: String,
},
img: {
  type: String,
},
});
module.exports =Post = mongoose.model("post", PostSchema);