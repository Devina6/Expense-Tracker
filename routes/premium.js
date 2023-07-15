const express = require('express');
const router = express.Router();

const premiumController = require('../controllers/premium');
const userAuthentication = require('../middleware/auth');


router.get('/leaderboardstatus',premiumController.leaderBoardStatus);


module.exports = router;
