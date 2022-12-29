const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const peopleSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    userName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    Photo: {
        type: String,
    },
    
    followers: [{
        type: ObjectId,
        ref: "PEOPLE"
    }], 

    following: [{
        type: ObjectId,
        ref: "PEOPLE"
    }]

})

mongoose.model("PEOPLE", peopleSchema);


// const fruitSchema = new mongoose.Schema({
//     name: String,
//     rating: Number,
//     review: String
// });

// const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit({
//     name: "Apple",
//     rating: 7,
//     review: "Taste Good"
// });

// fruit.save();