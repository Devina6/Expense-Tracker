const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const rootDir = require('../util/path');
const fs = require('fs');

const User = require('../models/user');
const Expense = require('../models/expense');


exports.getIndex = (req,res,next) => {
    const id = req.user.id;
    Expense.findAll({where:{userId:id}})
        .then(expenses => {
            res.json(expenses);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
}


exports.postExpense = (req,res,next) => {
    let amount = req.body.amount;
    let description = req.body.description;
    let category = req.body.category;
    let id = req.user.id
    if(amount!='' && description!='' && category!='' && id!=''){
        Expense.create({
            amount:amount,
            description:description,
            category:category,
            userId:id
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => console.log(err))
    }
}

exports.deleteExpense = (req,res,next) => {

    const id = req.params.expenseId;
    Expense.findByPk(id)
        .then(expense => {
            if(!expense){
                console.log("expense not found");
            }else{
                return expense.destroy();
            }
        })
        .then(result => {
           res.redirect('/expense/index')
        })
        .catch(err => console.log(err))
}
