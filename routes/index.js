var express = require('express');
var router = express.Router();
let seedrandom = require('seedrandom');

function genSample(len, seed) {
  let rng = seedrandom(seed);

  let res = [];
  for (let i = 0; i < len/2; ++i){
    res.push({
      x : rng() * 0.8 ,
      y : rng() * 0.9 ,
      class : 0
    });

    res.push({
      x : 0.4 + rng() * 0.6 ,
      y : 0.5 + rng() * 0.5 ,
      class : 1
    });
  }
  return res;
}

router.get('/sample', (req, res) => {
  let sample = genSample(1000, 'asdf');
  res.json(sample);
});

router.get('/cont-sample', (req, res) => {
  let sample = genSample(100, 'very unique one');
  res.json(sample);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
