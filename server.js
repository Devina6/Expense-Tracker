const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./util/database');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use(userRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/premium',premiumRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);

sequelize
    .sync()
    //.sync({force:true})
    .then(result => {
        app.listen(5000);
    })
    .catch(err => console.log(err))
