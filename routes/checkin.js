const express = require('express');
const router = express.Router();
const { query } = require('../database/index');

const LOG_TYPE = {
  NORMAL: 0, // 日常打卡
  REPLACEMENT: 1 // 补签
}

/* GET tasks list. */
router.get('/list', async function (req, res, next) {
  const results = await query('SELECT * FROM checkin_logs');
  res.jsonResponse(results);
});

/* POST create new checkin log. */
router.post('/create', async function (req, res, next) {
  const reqBody = req.body;
  const keys = ['user_id', 'task_id', 'date'];
  const isReplacement = reqBody.type !== undefined
  if (!isReplacement) {
    // 日常打卡
    await query(
        `INSERT INTO checkin_logs (${keys}) values (${reqBody['user_id']}, ${reqBody['task_id']}, '${reqBody['date']}')`,
    );
  } else {
    // 补签打卡
    keys.push('type')
    await query(
        `INSERT INTO checkin_logs (${keys}) values (${reqBody['user_id']}, ${reqBody['task_id']}, '${reqBody['date']}', 1)`,
    );
  }
  res.jsonResponse({});
});

module.exports = router;
