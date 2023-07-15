const express = require('express');
const path = require('path');

const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = require('../models/user');
const Expense = require('../models/expense');

exports.leaderBoardStatus = (req,res,next) => {
    console.log("in leader Board Status")
    Expense.findAll({
        attributes: ['user.id',
          [sequelize.literal('user.firstName'), 'firstName'],
          [sequelize.literal('user.lastName'), 'lastName'],
          [sequelize.fn('SUM', sequelize.col('amount')), 'total_expense']
        ],
        include: [{model: User,attributes: []}],
        group: ['user.id', 'firstName', 'lastName'],
        order: [[sequelize.literal('total_expense'), 'DESC']]
      })
      .then(result => {
        return res.json(result);
      })
      .catch(error => {
        console.error(error);
      })      
    
}
