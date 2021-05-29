const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let liveGameSchema = new Schema(
    {
        homeTeam: String,
        awayTeam: String,
        homeScore: Number,
        awayScore: Number,
        gameTime: String
    }
)

let liveGamesSchema = new Schema(
    {
        games: [liveGameSchema],
        timeStamp: Number
    }
);

const liveGame = mongoose.model("live_game", liveGameSchema);
const liveGames = mongoose.model("live_games", liveGamesSchema);

module.exports = {
    liveGame: liveGame,
    liveGames: liveGames
}