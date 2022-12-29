const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../Middlewar/requireLogin');
const { route } = require('./path');
const POST = mongoose.model("POST");

//route

router.get("/allposts", requireLogin, (req,res) => {
    POST.find()
    .populate("postedBy", "_id name Photo")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})


router.post("/createPost", requireLogin, (req, res) => {
    const { body, pic } = req.body;
    console.log(pic)
    if(!body || !pic) {
        return res.status(401).json({ error: "Pleace add all the fields" })
    }
    console.log(req.user)

    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    })
    
    post.save().then((result) => {
        return res.json({ post:result })
    }).catch(err => console.log(err))
})


router.get("/myposts", requireLogin, (req,res) => {
    POST.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then(myposts => {
        res.json(myposts)
    })
    // console.log(req.user)
})


router.put("/like", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { like: req.user._id }
    }, {
        new:true
    })
    .populate("postedBy", "_id name Photo")
    .exec((err,result) => {
        if(err) {
        return res.status(404).json({ error: err })
    } else {
        res.json(result)
     }
    })
})


router.put("/nolike", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { like:req.user._id }
    }, {
        new:true
    })
    .populate("postedBy", "_id name Photo")
    .exec((err,result) => {
        if(err) {
        return res.status(404).json({ error: err })
    } else {
        res.json(result)
     }
    })
})

router.put("/comment", requireLogin, (req, res) => {
    const comment = {
        comment: req.body.text,
        postedBy: req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    })
    .populate("comments.postedBy", "_id name" )
    .populate("postedBy", "_id name Photo")
    .exec((err,result) => {
        if(err) {
            return res.status(404).json({ error: err })
        } else {
            res.json(result)
        }
    })
})

router.delete("/deletePost/:postId", requireLogin, (req, res) => {
   
    POST.findOne({ _id: req.params.postId })
    // console.log(req.params.postId)
    .populate("postedBy", "_id")
    .exec((err, post) => {
       if(err || !post) {
        return res.status(404).json({error:err})
       }
    //    console.log(post.postedBy._id.toString(), req.user._id.toString())
       if(post.postedBy._id.toString() == req.user.
       _id.toString()){
        post.remove()
        .then(result => {
            return res.json({ message: "Succesfully deleted"})
        }).catch((err) => {
            console.log(err)
        })
       }
    }) 
})
    
// to show following post
router.get("/myfollwingpost", requireLogin, (req, res) => {
    POST.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => { console.log(err) })
})


module.exports = router