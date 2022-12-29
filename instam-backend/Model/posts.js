const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const postsSchema = new mongoose.Schema({

    // title:{
    //     type:String,
    //     required:true
    // },

    body:{
        type:String,
        required:true
    },
    
    photo:{
        type:String,
        require:true
    },

    like: [{
        type: ObjectId,
        ref: "PEOPLE"
    }],

    comments: [{
        comment: {
            type: String
        },

        postedBy: {
            type: ObjectId, 
            ref: "PEOPLE"
        }
    }],

    postedBy: {
        type:ObjectId,
        ref: "PEOPLE"
    }
}, { timestamps: true }) 


mongoose.model("POST", postsSchema);
