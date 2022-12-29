const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const PEOPLE = mongoose.model("PEOPLE");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const { Jwt_personalni } = require("../accesskeys")
const requireLogin = require("../Middlewar/requireLogin");


router.get('/', (req,res) => {
    res.send("hello")
})


// router.get("/createPost", requireLogin ,(req,res) => {
//     console.log("hello path")
// })


router.post("/signup", (req,res) => {
    const {name, userName, email, password} = req.body;
    if(!name || !email || !userName || !password){
        return res.status(404).json({error: "Pleace add all the fields"})
    }

    PEOPLE.findOne({ $or: [{ email:email}, { userName:userName }] }).then((savedPeople) => { 
        if(savedPeople){
            return res.status(404).json({ error: "User was already that email or userName" })
        }
     })


     bcrypt.hash(password, 12).then((approvedPassword) => {

        const people = new PEOPLE({
            name,
            email,
            userName,
            password:approvedPassword
        })
    
        people.save()
        .then(people => { res.json({massage: "Registered succesfully"}) })
        .catch(err => { console.log(err) })

     })
})


router.post("/signin", (req,res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(404).json({error: "Pleace add email and password"})
    }

    PEOPLE.findOne({email:email}).then((savedPeople) => {
        if(!savedPeople) {
            return res.status(404).json({ error: "Invalid email"})
        }

        bcrypt.compare(password,savedPeople.password).then((match) => {
            if(match) {
                // return res.status(301).json({massage: "Signed bravo"})
                const token = jwt.sign({_id:savedPeople.id},Jwt_personalni)

                const {_id, name, email, userName} = savedPeople;

                res.json({ token, user: {_id, name, email, userName} })

                console.log({ token, user: {_id, name, email, userName} })
                
            }else {
                return res.status(404).json({error: "Invalid password"})
            }
        })
        .catch(error=>console.log(error));
    })
})
   
module.exports = router;