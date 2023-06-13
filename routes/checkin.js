const express = require('express');
const router = express.Router();
const { query } = require('../database/index');

const LOG_TYPE = {
  // 日常打卡
  NORMAL: 0,
  // 补签
  REPLACEMENT: 1,
};

/* GET tasks list. */
router.get('/list', async function (req, res, next) {
  const user_id = req.query['user_id']
  let results = []
  if (user_id) {
    results = await query(`SELECT * FROM checkin_logs WHERE user_id = ${user_id}`);
  } else {
    results = await query(`SELECT * FROM checkin_logs`);
  }

  res.jsonResponse(results);
});

/* POST create new checkin log. */
router.post('/create', async function (req, res, next) {
  const reqBody = req.body;
  const keys = ['user_id', 'task_id', 'date', 'type'];
  const isReplacement = reqBody.type !== undefined && reqBody.type === LOG_TYPE.REPLACEMENT;
  await query(
    `INSERT INTO checkin_logs (${keys}) values (${reqBody['user_id']}, ${reqBody['task_id']},
 '${reqBody['date']}', ${isReplacement ? LOG_TYPE.REPLACEMENT : LOG_TYPE.NORMAL})`,
  );
  res.jsonResponse({});
});

module.exports = router;
