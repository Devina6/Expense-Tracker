const express = require('express');
const router = express.Router();

const premiumController = require('../controllers/premium');



router.get('/leaderboardstatus',premiumController.leaderBoardStatus);


module.exports = router;
