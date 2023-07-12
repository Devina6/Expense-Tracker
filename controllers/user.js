const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const fs = require('fs');

const User = require('../models/user');

exports.Signup = (req,res,next) => {
    console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
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
                    User.create({
                        firstName:firstName,
                        lastName:lastName,
                        email:email,
                        password:password
                    })
                    .then(result => {
                        //res.json(result);
                        console.log("result is:")
                        console.log(result);
                    })
                    .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
     
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
                        if(password===user[0].dataValues.password){
                            res.json({res:"Successfully Logged-in",pass:true})
                        }else{
                            res.json({res:"Please enter the correct details", pass:false})
                        }
                    }
            })
            }else{
                res.json({res:"Error : User not Registered, Please Signup", pass:false})
            }
        })
}
