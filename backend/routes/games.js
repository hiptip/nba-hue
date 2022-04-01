var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var dburl = process.env.MONGO_URI;


//takes two params: home team and time stamp
router.get('/', function (req, res, next) {


  MongoClient.connect(dburl, function (err, db) {
    if (err) throw err;
    var dbo = db.db('nba_games');
    if (!req.query.timeStamp) {
      var query = { timeStamp: {$gte: Date.now() - Math.max(req.query.delay, 3000)} }; // .limit(1)
    } else {
      var query = { timeStamp: {$gt: parseInt(req.query.timeStamp)} }; // .limit(1)
    }
    // console.log(decodeURI(req.query.homeTeam))
    //.limit(1)   basically if greater than timestamp and limit 1 -- if timestamp not set just set it automatically
    dbo.collection('live_games').find(query).limit(1).toArray(function (err, result) {
      if (err) throw err;
      if (result) {
        res.send(result[0].games.filter(game => game.status == 'InProgress'))
      }
      db.close();
    });
  });
});

module.exports = router;
