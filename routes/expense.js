const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense');
const userAuthentication = require('../middleware/auth');


router.get('/index',userAuthentication.authenticate,expenseController.getIndex);
router.post('/addExpense',userAuthentication.authenticate,expenseController.postExpense);
router.get('/delete/:expenseId',userAuthentication.authenticate,expenseController.deleteExpense);

module.exports = router;
