const Sequelize = require('sequelize');
const sequelize = new Sequelize('expensetracker','root','SQLpassword',{
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;
