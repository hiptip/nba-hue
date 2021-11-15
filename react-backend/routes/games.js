var express = require('express');
var router = express.Router();
var unirest = require("unirest");
const rp = require('request-promise');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const url = 'https://www.flashscore.com/basketball/';
var MongoClient = require('mongodb').MongoClient;
var dburl = "mongodb+srv://nbauser:Jm8q7RMr9jZPX3E4@cluster0.6zsre.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// fetchLiveGames = () => {

// }

// getGameScore = (gameId) => {

// }

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   // Comment out this line:
//   //res.send('respond with a resource');

//   puppeteer
//     .launch()
//     .then(async browser => {
//       //opening a new page and navigating to Fleshscore
//       const page = await browser.newPage();
//       await page.goto('https://www.flashscore.com/basketball');
//       await page.waitForSelector('body');
//       //manipulating the page's content
//       let grabMatches = await page.evaluate(() => {
//         let allLiveMatches = document.body.querySelectorAll('.event__match');
//         //storing the post items in an array then selecting for retrieving content
//         scrapeItems = [];
//         allLiveMatches.forEach(item => {
//           let postDescription = '';
//           try {
//             let homeTeam = item.querySelector('.event__participant--home').innerText;
//             let awayTeam = item.querySelector('.event__participant--away').innerText;
//             let currentHomeScore = item.querySelector('.event__score--home').innerText;
//             let currentAwayScore = item.querySelector('.event__score--away').innerText;
//             if (homeTeam == "Philadelphia 76ers" || awayTeam == "Philadelphia 76ers") {
//               scrapeItems = {
//                 homeTeam: homeTeam,
//                 awayTeam: awayTeam,
//                 currentHomeScore: currentHomeScore,
//                 currentAwayScore: currentAwayScore,
//               };
//             }
//           } catch (err) { console.log(err) }

//         });
//         return scrapeItems;
//       });
//       //outputting the scraped data

//       // setTimeout(() => {
//       // }, 10000)
//       console.log(grabMatches);
//       res.send(grabMatches)
//       //closing the browser
//       await browser.close();
//     })
//     //handling any errors
//     .catch(function (err) {
//       console.error(err);
//     });
// });

//takes two params: home team and time stamp
router.get('/', function (req, res, next) {

  
  MongoClient.connect(dburl, function (err, db) {
    if (err) throw err;
    var dbo = db.db('nba_games');
    if (!req.query.timeStamp) {
      var query = { timeStamp: {$gte: Date.now() - req.query.delay} }; // .limit(1)
    } else {
      var query = { timeStamp: {$gt: parseInt(req.query.timeStamp)} }; // .limit(1)
    }
    // console.log(decodeURI(req.query.homeTeam))
    //.limit(1)   basically if greater than timestamp and limit 1 -- if timestamp not set just set it automatically 
    dbo.collection('live_games').find(query).limit(1).toArray(function (err, result) {
      if (err) throw err;
      // console.log(result[0].games);
      res.send(result[0].games)
      db.close();
    });
  });
});

module.exports = router;