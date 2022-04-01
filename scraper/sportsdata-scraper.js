const fetch = require('node-fetch');
const { liveGames, liveGame } = require("./model");
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nbauser:Jm8q7RMr9jZPX3E4@cluster0.6zsre.mongodb.net/nba_games?retryWrites=true&w=majority');
mongoose.set('debug', true);

const connection = mongoose.connection;

const teamNameMap = {
    'ATL': 'Atlanta Hawks',
    'BOS': 'Boston Celtics',
    'BKN': 'Brooklyn Nets',
    'CHA': 'Charlotte Hornets',
    'CHI': 'Chicago Bulls',
    'CLE': 'Cleveland Cavaliers',
    'DAL': 'Dallas Mavericks',
    'DEN': 'Denver Nuggets',
    'DET': 'Detroit Pistons',
    'GS': 'Golden State Warriors',
    'HOU': 'Houston Rockets',
    'IND': 'Indiana Pacers',
    'LAC': 'Los Angeles Clippers',
    'LAL': 'Los Angeles Lakers',
    'MEM': 'Memphis Grizzlies',
    'MIA': 'Miami Heat',
    'MIL': 'Milwaukee Bucks',
    'MIN': 'Minnesota Timberwolves',
    'NO': 'New Orleans Pelicans',
    'NY': 'New York Knicks',
    'OKC': 'Oklahoma City Thunder',
    'ORL': 'Orlando Magic',
    'PHI': 'Philadelphia 76ers',
    'PHO': 'Phoenix Suns',
    'POR': 'Portland Trail Blazers',
    'SAC': 'Sacramento Kings',
    'SA': 'San Antonio Spurs',
    'TOR': 'Toronto Raptors',
    'UTA': 'Utah Jazz',
    'WAS': 'Washington Wizards'
}

connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
    let today = new Date()
    today = today.toLocaleString('en-US', { timeZone: 'America/New_York' });
    today = today.split(',')[0].split('/').join('-');

    let key = '6fb45641736a4d368024bfb3a7e31a0a';
    setInterval(() => {

        // call sports data api
        const url = `https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${today}?key=${key}`;
        let mongo_games = new liveGames({ timeStamp: Date.now() });
        fetch(url)
            .then(res => res.json())
            .then(games => {
                for (const game in games) {
                    var gameInfo = {
                        homeTeam: teamNameMap[games[game].HomeTeam],
                        awayTeam: teamNameMap[games[game].AwayTeam],
                        homeScore: games[game].HomeTeamScore,
                        awayScore: games[game].AwayTeamScore,
                        quarter: games[game].Quarter,
                        minutesRemaining: games[game].TimeRemainingMinutes,
                        secondsRemaining: games[game].TimeRemainingSeconds,
                        status: games[game].Status
                    }
                    var mongo_game = new liveGame(gameInfo);
                    mongo_games.games.push(mongo_game);
                }
                mongo_games.save(function (err, game) {
                    if (err) return console.error(err);
                    console.log(game)
                })
            })
            .catch(err => console.log(err));
    }, 3000);
});
