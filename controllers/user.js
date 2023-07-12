const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const rootDir = require('../util/path');
const fs = require('fs');

const User = require('../models/user');

exports.Signup = (req,res,next) => {
    console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    if(firstName!='' && lastName!='' && email!='' && password!=''){
        User.findAll({where:{email:email}})
                .then(userExist => {
                    if(userExist.length>0){
                        fs.readFile(path.join(rootDir, 'client', 'signup.html'), 'utf8', (err, data) =>{
                            if (err) {
                                console.log(err);
                                res.status(500).send('Internal Server Error');
                            }else{
                                res.json({ res: "Error : This USER already EXISTS" });
                            }
                        })  
                    }else{
                        const salt = 10; //more salt more encrypt-increase based on number of users
                        bcrypt.hash(password,salt,async(err,hash) => {
                        if(err){
                            console.log(err)
                        }else{
                            await User.create({
                            firstName:firstName,
                            lastName:lastName,
                            email:email,
                            password:hash
                        })
                        .then(result => {
                            //res.json(result);
                            //console.log(result);
                            res.json({res:"Successfully Registered!",pass:true})
                        })
                        .catch(err => console.log(err))
                    }
                })
            }
        })
        .catch(err => console.log(err))
    }else{
        res.json({res:"Error",pass:false})
    }
}

exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findAll({where:{email:email}})
        .then(user => {
            if(user.length>0){
                fs.readFile(path.join(rootDir, 'client', 'login.html'), 'utf8', (err, data) =>{
                    if (err) {
                        console.log(err);
                        res.status(500).send('Internal Server Error');
                    }else{
                        bcrypt.compare(password,user[0].dataValues.password,(err,result) => {
                            if(err){
                                res.json({res:"Something went wrong",pass:false})
                            }
                            if(result){
                                res.json({res:"Successfully Logged-in",pass:true})
                            }else{
                                res.json({res:"Please enter the correct details", pass:false})
                            }
                        })
                    }
            })
            }else{
                res.json({res:"Error : User not Registered, Please Signup", pass:false})
            }
        })
}
