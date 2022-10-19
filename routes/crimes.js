var express = require('express');
var { getCSVData } = require('../util.js');

var router = express.Router();

/* GET crime records. */
router.get('/', async function (req, res, next) {
  try {
    const crimeList = await getCSVData();
    res.send(crimeList);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
