const express = require('express');
const router = express.Router();
const { query } = require('../database/index');

/* GET tasks list. */
router.get('/list', async function (req, res, next) {
  const results = await query('SELECT * FROM checkin_logs');
  res.jsonResponse(results);
});

/* POST create new checkin log. */
router.post('/create', async function (req, res, next) {
  const reqBody = req.body;
  const keys = ['user_id', 'task_id', 'date'];
  const values = [];
  keys.forEach((key) => values.push(reqBody[key]));
  console.log(reqBody);
  const results = await query(
    `INSERT INTO checkin_logs (${keys}) values (reqBody['user_id'], reqBody['task_id'], '${reqBody['date']}')`,
  );
  res.jsonResponse(results);
});

module.exports = router;
