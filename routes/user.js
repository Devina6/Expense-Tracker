const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const authentication = require('../middleware/auth');
const expenseController = require('../controllers/expense');

router.post('/adduser',userController.signup);
router.post('/login',userController.login);
router.post('/forgotpassword',userController.forgotPassword);
router.get('/password/:passwordId',userController.resetPassword);
router.post('/resetpassword',authentication.userAuthenticate,authentication.passwordAuthenticate,userController.passwordReset);

module.exports = router;
