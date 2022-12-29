'use strict';

const mongoose = require("mongoose");
const express = require('express');
const app = express();
const PORT = 3333;
const cors = require("cors")

app.use(cors())
require('./Model/models');
require('./Model/posts')
// app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(require("./Routes/path"))
app.use(require("./Routes/CreatePost"))
app.use(require("./Routes/user"))
mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://alRizo:MEIt5JwrqUHvUIIs@cluster0.aq0tzpb.mongodb.net/fsdf",{useNewUrlParser: true}, (err) => {
    if(!err) console.log("db connects");
    else console.log('Db error');
});


app.listen(PORT, () => {
    console.log("taki 3333",PORT);
})




// const information = require('./information.js')
// const express = require('express');
// const app = express();
// const cors = require("cors")
// // const http = require('http');
// const PORT = 3333;

// app.use(cors());

// app.get('/about', (req,res) => {
//     res.json("about pages");
// });

// app.get('/', (req,res) => {
//     res.json(information)
// });


// app.listen(PORT, () => {
//     console.log("taki 3333",PORT);
// })

// const server = http.createServer((req,res) => {
//     console.log("succesfully");
//     res.end("this continue");
// });

// server.listen(PORT,"localhost", () => {
//     console.log("taki 3333",PORT);
// })