const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense');


router.get('/index/:userId',expenseController.getIndex);
router.post('/addExpense/:userId',expenseController.postExpense);
router.get('/delete/:expenseId',expenseController.deleteExpense);

module.exports = router;
