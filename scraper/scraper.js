const puppeteer = require('puppeteer');
const { liveGames, liveGame } = require("./model");
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nbauser:Jm8q7RMr9jZPX3E4@cluster0.6zsre.mongodb.net/nba_games?retryWrites=true&w=majority');
mongoose.set('debug', true);

const connection = mongoose.connection;

connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
    setInterval(() => {
        puppeteer
            .launch()
            .then(async browser => {
                //opening a new page and navigating to Fleshscore
                const page = await browser.newPage();
                await page.setDefaultNavigationTimeout(0);
                await page.goto('https://www.flashscore.com/basketball');
                await page.waitForSelector('body');
                await page.exposeFunction('newScore', s => console.log(s));
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
                                    gameTime: gameTime
                                });
                            }

                        } catch (err) { console.log(err) }

                    });
                    return scrapeItems;
                });
                //outputting the scraped data
                let games = new liveGames({ timeStamp: Date.now() });
                for (const match in grabMatches) {
                    console.log(games)
                    var game = new liveGame(grabMatches[match]);
                    games.games.push(game)
                }
                games.save(function (err, game) {
                    if (err) return console.error(err);
                    console.log(game)
                })
                await browser.close();
            })
            .catch(function (err) {
                console.error(err);
            });

    }, 3000);
});