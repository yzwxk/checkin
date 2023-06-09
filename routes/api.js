const express = require('express');
const router = express.Router();
const { query } = require('../database/index')

/* GET home page. */
router.get('/list', async function(req, res, next) {

    const results = await query('SELECT * FROM checkin_logs');
    console.log(results)
    // return results.map(row => row.date.toISOString().slice(0, 10));

    res.send(results);
});

module.exports = router;
