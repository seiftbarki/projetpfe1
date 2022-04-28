const Post = require("../models/Post");
const router = require('express').Router();
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const isAuth = require("../middlewares/verifyToken");

const fileUploadPaths = {
  FILE_UPLOAD_PATH: path.join(__dirname, "..", "client/public/uploads"),
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, fileUploadPaths.FILE_UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname.toLowerCase().replace(/ /g, "_"));
  },
});

const postFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
      cb(null, true);
  } else {
      cb(null, false);
  }
};

let uploadPost = multer({
  storage: storage,
  fileFilter: postFilter,
});

router.post('/createPost' , isAuth,uploadPost.single("img"), async(req,res)=>{

    try {
    const {title,description} = req.body;
    const post = await Post.create({title,description})
    res.status(200)
        .json({status : true , message : "post created" , data : post});
    }
    catch(err) {
    
        res.status(500).json({status : false , message : err});
    }
    });
    router.put("/updatepost/:id",isAuth, async (req, res) => {
        const { title, description } = req.body;
        try {
          let { id } = req.params;
          console.log(id);
          let post = await Post.findOne({
            user: req.user._id,
          });
          if (post) {
            let post = await Post.findOneAndUpdate(
              { id },
              { ...req.body },
              { new: true }
            );
            return res.status(200).json({
              status: true,
              msg: "Post updated successfully!!",
              data: post,
            });
          } else {
            return res.status(400).json({ status: true, msg: "Not allowed!!" });
          }
        } catch (err) {
          res.status(500).json({ status: false, msg: err });
        }
      });

      router.get("/allPosts",isAuth,async(req,res) => {
        try{
    const post = await Post.find({user: req.user._id });
    res.status(200).json({status: true, message:"Post",data:post});
    
        }catch{
            console.log(err);
           res.status(500).json({status: false, message: err});
        }
    
    });

    router.delete("/deletepost/:id",isAuth, async (req, res) => {
        try {
          const { id } = req.params;
          const Deletedpost = await Profile.findByIdAndDelete(id);
          res.status(200).json({
            status: true,
            message: "post Deleted .. !",
            data: Deletedpost,
          });
        } catch (err) {
          console.log(err);
          res.status(500).json({ status: false, message: err });
        }
      });



    module.exports = router;