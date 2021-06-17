import React from 'react'

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    background: {
        boxShadow:'inset 0 0 100px rgba(0,0,0,.8)',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        padding:20,
        overflow: 'auto',
        background: '#23d5ab',
        fontFamily: 'Roboto Mono',
    },
    gameCenter: {
        height:'100vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    gameInfo: {
        margin:'0 auto',
        display:'flex',
        maxWidth:1000,
        width:1000,
        justifyContent:'center',
        textAlign:'center'
    },
    awayTeam: {
        padding:0,
        width:'100%'
    },
    homeTeam: {
        padding:0,
        width:'100%'
    },
    gameTime: {
        display:'flex',
        justifyContent:'center',
        marginTop:250,
        padding:20,
        display:'inline-block'
    },
    quarter: {
        margin:0,
        padding:0
    },
    time: {
        margin:0,
        padding:0
    },
    teamName: {
        margin:0,
        padding:0,
        fontSize:18
    },
    score: {
        margin:0,
        padding:0,
        fontSize:100
    },
    logoContainer: {
        width:200,
        height:200,
        margin:'0 auto',
        display:'inline-block',
        verticalAlign:'middle'
    },
    teamLogo: {
        maxWidth:'100%',
        height:'200px',
        width:'100%',
        display:'inline-block',
        verticalAlign:'middle',
        background:'black',
        marginBottom:30
    },
    liveBack: {
        fontFamily: 'Roboto Mono',
        fontWeight: '400',
        fontSize: 18,
        textTransform:'uppercase',
        display:'block',
        color: 'white',
        position:'absolute',
        top:20,
        left:20
    },
    calibrate: {
        fontFamily: 'Roboto Mono',
        fontWeight: '400',
        fontSize: 18,
        color: 'white',
        border:'none',
        background:'black',
        position:'absolute',
        bottom:20,
        borderRadius:30,
        padding:'10px 25px'
    }
});

const GamePage = (props) => {
    const classes = useStyles();
    const mockGameData = [
        {
            homeTeam: "Dallas Mavericks",
            homeScore: "23",
            awayTeam: "Knicks",
            awayScore: "30",
            quarter: "1Q",
            timeRemaining: "2'"
        },
        {
            homeTeam: "Knicks",
            homeScore: "23",
            awayTeam: "Knicks",
            awayScore: "30",
            quarter: "1Q",
            timeRemaining: "2'"
        },
        {
            homeTeam: "Knicks",
            homeScore: "23",
            awayTeam: "Knicks",
            awayScore: "30",
            quarter: "1Q",
            timeRemaining: "2'"
        }
    ]


    var game = props.liveGames.find(game => game.homeTeam === props.homeTeam)
    // console.log(game)

    return (
        <div className={classes.background}>
            <h1 className={classes.liveBack}>{'< Back to live games'}</h1>
            <div className={classes.gameCenter}>
                <div className={classes.gameInfo}>
                    <div className={classes.awayTeam}>
                        <div className={classes.teamLogo}></div>
                        <p className={classes.teamName}>{props.awayTeam}</p>
                        <p className={classes.score}>{game.awayScore}</p>
                    </div>
                    <div className={classes.gameTime}>
                        <p className={classes.quarter}>{game.quarter}</p>
                        <p className={classes.time}>{game.timeRemaining}</p>
                        <p className={classes.quarter}>4th quarter</p>
                        <p className={classes.time}>10:37</p>
                    </div>
                    <div className={classes.homeTeam}>
                        <div className={classes.teamLogo}></div>
                        <p className={classes.teamName}>{props.homeTeam}</p>
                        <p className={classes.score}>{game.homeScore}</p>
                    </div>
                </div>
            </div>
            <button className={classes.calibrate}>CALIBRATE LATENCY</button>
        </div>
    )
}

export default GamePage
