const jwt = require('jsonwebtoken');
const { Jwt_personalni } = require("../accesskeys")
const mongoose = require('mongoose');
const PEOPLE = mongoose.model("PEOPLE");


module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization) {
        return res.status(402).json({ error: "You must have logged in 1" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token,Jwt_personalni,(err, payload) =>{
        if(err){
            return res.status(402).json({ error: "You must have logged in 2" })
        }
        const {_id} = payload
        PEOPLE.findById(_id).then(userData => {
            req.user = userData
            next()
        })

    })
    
}