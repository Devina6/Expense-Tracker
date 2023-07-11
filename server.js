const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./util/database');
const cors = require('cors')

const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use(userRoutes);

sequelize
    .sync()
    //.sync({force:true})
    .then(result => {
        app.listen(5000);
    })
    .catch(err => console.log(err))
