var express = require('express');
var router = express.Router();
var unirest = require("unirest");
const rp = require('request-promise');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const url = 'https://www.flashscore.com/basketball/';

// fetchLiveGames = () => {

// }

// getGameScore = (gameId) => {

// }

/* GET users listing. */
router.get('/', function (req, res, next) {
    // Comment out this line:
  //res.send('respond with a resource');

  puppeteer
    .launch()
    .then(async browser => {
      //opening a new page and navigating to Fleshscore
      const page = await browser.newPage();
      await page.goto('https://www.flashscore.com/basketball');
      await page.waitForSelector('body');
      //manipulating the page's content
      let grabMatches = await page.evaluate(() => {
        let allLiveMatches = document.body.querySelectorAll('.event__match');
        //storing the post items in an array then selecting for retrieving content
        scrapeItems = [];
        allLiveMatches.forEach(item => {
          let postDescription = '';
          try {
            let homeTeam = item.querySelector('.event__participant--home').innerText;
            let awayTeam = item.querySelector('.event__participant--away').innerText;
            let currentHomeScore = item.querySelector('.event__score--home').innerText;
            let currentAwayScore = item.querySelector('.event__score--away').innerText;
            if (homeTeam == "Philadelphia 76ers" || awayTeam == "Philadelphia 76ers") {
              scrapeItems = {
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                currentHomeScore: currentHomeScore,
                currentAwayScore: currentAwayScore,
              };
            }
          } catch (err) { console.log(err) }

        });
        return scrapeItems;
      });
      //outputting the scraped data

      // setTimeout(() => {
      // }, 10000)
      console.log(grabMatches);
      res.send(grabMatches)
      //closing the browser
      await browser.close();
    })
    //handling any errors
    .catch(function (err) {
      console.error(err);
    });
});

router.get('/games', function (req, res, next) {
  puppeteer
    .launch()
    .then(async browser => {
      //opening a new page and navigating to Fleshscore
      const page = await browser.newPage();
      await page.goto('https://www.flashscore.com/basketball');
      await page.waitForSelector('body');
      //manipulating the page's content
      let grabMatches = await page.evaluate(() => {
        let allLiveMatches = document.body.querySelectorAll('.event__match');
        //storing the post items in an array then selecting for retrieving content
        scrapeItems = [];
        teams = [
          'Atlanta Hawks',
          'Boston Celtics',
          'Brooklyn Nets',
          'Charlotte Hornets',
          'Chicago Bulls',
          'Cleveland Cavaliers',
          'Dallas Mavericks',
          'Denver Nuggets',
          'Detroit Pistons',
          'Golden State Warriors',
          'Houston Rockets',
          'Indiana Pacers',
          'Los Angeles Clippers',
          'Los Angeles Lakers',
          'Memphis Grizzlies',
          'Miami Heat',
          'Milwaukee Bucks',
          'Minnesota Timberwolves',
          'New Orleans Pelicans',
          'New York Knicks',
          'Oklahoma City Thunder',
          'Orlando Magic',
          'Philadelphia 76ers',
          'Phoenix Suns',
          'Portland Trail Blazers',
          'Sacramento Kings',
          'San Antonio Spurs',
          'Toronto Raptors',
          'Utah Jazz',
          'Washington Wizards',
        ]
        allLiveMatches.forEach(item => {
          let postDescription = '';
          try {
            let homeTeam = item.querySelector('.event__participant--home').innerText;
            let awayTeam = item.querySelector('.event__participant--away').innerText;
            let currentHomeScore = item.querySelector('.event__score--home').innerText;
            let currentAwayScore = item.querySelector('.event__score--away').innerText;
            let gameTime = item.querySelector('.event__stage--block').innerText;
            if (teams.includes(homeTeam) && (gameTime.includes("Quarter") || gameTime.includes("Half Time"))) {
              scrapeItems.push({
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                homeScore: currentHomeScore,
                awayScore: currentAwayScore,
                gameTime: gameTime,
              });
            }

          } catch (err) { console.log(err) }

        });
        return scrapeItems;
      });
      //outputting the scraped data

      // setTimeout(() => {
      // }, 10000)
      // console.log(grabMatches);
      res.send(grabMatches)
      //closing the browser
      await browser.close();
    })
    //handling any errors
    .catch(function (err) {
      console.error(err);
    });
});

module.exports = router;