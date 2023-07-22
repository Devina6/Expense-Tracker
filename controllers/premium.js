const express = require('express');
const path = require('path');

const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = require('../models/user');
const Expense = require('../models/expense');

exports.leaderBoardStatus = (req,res,next) => {

  User.findAll({
    attributes:['firstName','lastName','totalExpense'],
    order:[['totalExpense','DESC']]
  })
      .then(result => {
        return res.json(result);
      })
      .catch(error => {
        console.error(error);
      })    
}
