const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/list', async function(req, res, next) {
  const result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({body: 'respond with a resource'})
    }, 3000)
  })
  res.send(result);
});

module.exports = router;
