var express = require('express');
const { groupBy } = require('lodash');
var { getCSVData, getFormatDate } = require('../util.js');

var router = express.Router();

/* GET crime records. */
router.get('/', async function (req, res, next) {
  try {
    const crimeList = await getCSVData();

    // filter by reported date
    if (req.query?.reported_date) {
      console.log('getFormatedDate', getFormatDate(req.query?.reported_date));
      return res.send(
        crimeList.filter(
          (crime) =>
            crime['Reported Date'] === getFormatDate(req.query?.reported_date)
        )
      );
    }
    res.send(crimeList);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Get count for offence-count-by-level-1-desc
router.get('/offence-count-by-level-1-desc', async function (req, res, next) {
  try {
    const crimeList = await getCSVData();
    if (req.query?.level1_desc) {
      const crimeData = crimeList.filter(
        (crime) =>
          crime['Offence Level 1 Description'] === req.query?.level1_desc
      );
      const count = crimeData.reduce(
        (total, curVal) => total + +curVal['Offence count'],
        0
      );
      return res.send({ count });
    } else {
      return res.send({ count: 0 });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
