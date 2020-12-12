const express = require('express');
const router = express.Router();
const User = require('../model/User');
const path = require('path');

router.post('/register' , async (req,res)=>{
    
    try{

        const password =  req.body.password + req.body.username;
        let user = await User.findOne({email : req.body.email});
        if(user == null) user = await User.findOne({phone : req.body.phone});
        // console.log(user);
        if(user){
            return res.status(200).send({message : "Already Registered..."});
        }else{
            user = await User.create({
                name : req.body.name,
                phone : req.body.phone,
                email : req.body.email,
                password : password,
                city : req.body.city,
                country : req.body.country
            });
            return res.status(200).send({message : "New User Added, Login To Continue"});
        }
    }catch(e){
        console.log(e);
        return res.status(404).send({message : "Error Occurred" + e});
    }
});

router.post('/login' , async (req,res)=>{
    // console.log('login request here');
    try{
        const password =  req.body.password + req.body.username;
        // User.findOnes
        let user = await User.findOne({email : req.body.email});
        if(!user){
            return res.status(200).send({message : "Please Register Before Logging In.."});
        }else{
            if(user.password === password){
                return res.status(200).send({message : "Hey Welcome our Partner!!"});
            }else{
                return res.status(200).send({message : "Username or password is incorrect..."});
            }
        }
    }catch(e){
        console.log(e);
        return res.status(404).send({message : "Error Occurred"});
    }
});

router.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = router;