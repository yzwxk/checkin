const express = require('express');
const router = express.Router();
const { query } = require('../database/index')

/* GET home page. */
router.get('/list', async function(req, res, next) {
    const results = await query('SELECT * FROM checkin_logs');
    res.jsonResponse(results)
});

module.exports = router;
