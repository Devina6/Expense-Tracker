const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/database');


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


exports.postExpense = async (req,res,next) => {
    
    let amount = req.body.amount;
    let description = req.body.description;
    let category = req.body.category;
    let id = req.user.id
    sequelize.transaction(async (t)=>{
        try{
            if(amount!='' && description!='' && category!='' && id!=''){
                const expense = await Expense.create({
                    amount:amount,
                    description:description,
                    category:category,
                    userId:id
                },
                {transaction:t})
            const updatedTotalExpense = parseInt(req.user.totalExpense) + parseInt(amount);
            await User.update({ totalExpense: updatedTotalExpense },{where:{id:id},transaction:t})
            res.json({expense:expense})
        }
    }
    catch(err){
        await t.rollback();
        console.log(err)
    }
})
}


exports.deleteExpense = (req,res,next) => {
    sequelize.transaction(async(t)=>{
        try{
            const expense = await Expense.findOne({where:{id:req.params.expenseId}})
            const del = await Expense.destroy({where:{id:req.params.expenseId,userId:req.user.id}},{transaction:t})
            const updatedTotalExpense = parseInt(req.user.totalExpense) - parseInt(expense.amount);
            await User.update({ totalExpense: updatedTotalExpense },{where:{id:req.user.id},transaction:t})
            res.redirect('/expense/index')
        }
        catch(err){
            await t.rollback()
            return res.status(500).json({success:false,error:err})
                }
    })
    
}
