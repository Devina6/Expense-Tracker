const express = require('express');
const path  = require('../util/path');

const User = require('../models/user');

exports.postUser = (req,res,next) => {
    console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const data = User.create({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => console.log(err))
}
