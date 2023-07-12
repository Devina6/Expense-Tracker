const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/adduser',userController.postUser);
router.post('/login',userController.login)

module.exports = router;
