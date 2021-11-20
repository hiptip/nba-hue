import React, { useState, useEffect } from 'react'

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Icons from "@material-ui/icons";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import PickColors from './PickColors';
import { nbaLogoMap } from '../util/logos'

const useStyles = makeStyles((theme) => ({
    '@keyframes livePulse': {
        from: {
            background:'#ff0000',
        },
        to: {
            background:'#990000',
        },
    },
    "@keyframes shadowPulse": {
        "0%": {
            boxShadow:'0px 0px 20px rgba(255,255,255,.5), inset 0px 0px 20px rgba(0,0,0,.2)'
        },
        "50%": {
            boxShadow:'0px 0px 20px rgba(255,255,255,.2), inset 0px 0px 20px rgba(0,0,0,.5)'
        },
        "100%": {
            boxShadow:'0px 0px 20px rgba(255,255,255,.5), inset 0px 0px 20px rgba(0,0,0,.2)'
        }
    },
    wrapper: {
        // border: '1px solid black',
        width: '99vw',
        height: '101vh',
        display: 'block',
        padding:'40px 1vw',
        margin: 'auto',
        marginTop: -22,
        justifyContent: 'center',
        position: 'relative',
        fontFamily: 'Roboto Mono',
        background:'#ED6D1C',
        // background:'white',
    },
    modalBox: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width:'400px',
        padding:'50px',
        borderRadius: 20,
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        // boxShadow:'0 0 100px rgba(255,255,255,1)',
        backgroundColor: "white",
        animation: '$lightGlow 20s ease infinite',
        '@media (max-width:600px)': {
            width: '100vw',
            height:'100vh',
            paddingTop:200
        },
    },
    live: {
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        fontSize: '1em',
        display:'inline-flex',
        borderRadius:50,
        padding: '10px 15px',
        color: 'white',
        marginBottom:10,
        // border:'2px solid white',
        animation: '$livePulse 1s infinite alternate linear',
        boxShadow:'0px 0px 20px rgba(255,255,255,1)',
        [theme.breakpoints.down('xs')]: {
            color:'transparent',
            width:20,
            height:20,
            padding:0
        }
    },
    logoItems: {
        justifyContent:'center',
        textAlign:'center',
        position:'relative'
    },
    logoContainer: {
        position:'relative',
        overflow:'hidden',
        width: 300,
        height: 300,
        maxHeight: '100%',
        margin:'0 auto',
        borderRadius: '100%',
        animation: '$shadowPulse 5s linear infinite',
        backgroundColor:'rgba(255,255,255,.1)',
        [theme.breakpoints.down('md')]: {
            width: 150,
            height: 150,
        },
        [theme.breakpoints.down('sm')]: {
            width: 100,
            height: 100,
        },
        [theme.breakpoints.down('xs')]: {
            border:'2px solid white',
            width: 20,
            height: 20,
        }
    },
    logo: {
        width:600,
        height:'auto',
        marginLeft:'-50%',
        marginTop:'-50%',
        [theme.breakpoints.down('md')]: {
            width: 300,
            height: 300,
            marginLeft:'-55%',
            marginTop:'-55%',
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
            height: 200,
            marginLeft:'-50%',
            marginTop:'-50%',
        },
        [theme.breakpoints.down('xs')]: {
            display:'none'
        }
    },
    gameInfo: {
        margin:'auto',
        marginTop:'15vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',        /* for single line flex container */
        alignContent: 'center'      /* for multi-line flex container */
    },
    nameScore: {
        color:'white',
        display:'block',
        position:'relative'
    },
    text: {
        color:'white',
        fontWeight:'bold',
        lineHeight:'1em',
        margin:0,
        textShadow:'0px 0px 10px rgba(0,0,0,.5)',
        textTransform: 'uppercase',
    },
    teamName: {
        fontSize: '3vw',
        textAlign:'center',
        [theme.breakpoints.down('sm')]: {
            fontSize:'3vw'
        },
        position:'absolute',
        display:'block',
        width:'100%',
        top:'-3vw'
    },
    teamScore: {
        fontSize: '9vw',
        margin: '10px 0',
        textAlign:'center',
        [theme.breakpoints.down('xs')]: {
            fontSize: '15vw',
        }
    },
    timeContainer: {
        background:'white',
        width:'auto',
        paddingTop:15,
        display:'inline-block',
        borderRadius:'29px',
        boxShadow:'0px 0px 10px rgba(0,0,0,.5)',
        overflow:'hidden'
    },
    small: {
        fontSize:'.2em',
        fontFamily:'Roboto',
        background:'#fff',
        padding:'15px 15px',
        borderTop:'2px solid #ccc',
        textTransform:'uppercase',
        fontSize:'1em',
        marginBottom:0,
        '&:hover': {
            cursor:'pointer',
            textDecoration:'underline'
        },
        // textDecoration:'underline'
    },
    homeTeamScore: {
        fontSize: '10vw',
        fontWeight: 700,
        margin: '10px 0',
        textAlign:'center',
        lineHeight:'1em',
        margin:0,
        [theme.breakpoints.down('xs')]: {
            fontSize: '15vw',
        }
    },
    timeItems: {
        justifyContent:'center',
        textAlign:'center'
    },
    gameTime: {
        fontSize: '1.5em',
        lineHeight:'1em',
        margin:'5px 0 0 0',
        fontFamily:'Roboto',
        // color:'white',
        textAlign:'center',
        [theme.breakpoints.down('xs')]: {
            fontSize:'1em'
        }
    },
    calibrate: {
        display: 'block',
        backgroundColor:'black',
        color:'white',
        padding:'20px 30px',
        margin:'40px auto',
        borderRadius:'50px',
        cursor:'pointer',
        border:'none'
    },
    buttonStyle: {
        display:'block',
        cursor: 'pointer',
        fontSize: '1em',
        fontFamily:'Roboto',
        fontWeight:'bold',
        padding:'20px 30px',
        textTransform:'uppercase',
        borderRadius:'50px',
        boxShadow:'0px 0px 10px rgba(0,0,0,.5)',
    },
    goBack: {
        backgroundColor:'white',
        border:'none',
        color:'black',
    },
    changeColorPosition: {
        position:'absolute',
        marginTop:'40px',
        width:'100%'
    },
    changeColor: {
        margin:'0 auto',
        lineHeight:'1em',
        fontFamily:'Roboto',
        fontWeight:'bold',
        fontSize:'1em',
        display:'inline-flex',
        alignItems:'center',
        color:'black',
        textTransform:'uppercase',
        background:'white',
        padding:'10px 15px',
        borderRadius:'100px',
        boxShadow:'0px 0px 10px rgba(0,0,0,.5)',
        '&:hover': {
            cursor:'pointer'
        },
        [theme.breakpoints.down('sm')]: {
            display:'none'
        }
    },
    awayColor: {
        display:'inline-block',
        textTransform:'uppercase',
        marginRight:10,
        background:'#F58426',
        padding:10,
        borderRadius:'50px'
    },
    homeColor: {
        display:'inline-block',
        textTransform:'uppercase',
        marginRight:10,
        background:'#00538C',
        padding:10,
        borderRadius:'50px'
    },
    calibrateOverlay: {
        display:'none',
        position:'fixed',
        height:'200vh',
        width:'100vw',
        background:'rgba(0,0,0,.5)',
        zIndex:2
    },
    slider: {
        display:'flex',
        alignItems:'center',
        maxWidth:'80%',
        margin:'50px 10% 60px'
    },
    line: {
        background:'black',
        display:'flex',
        width:'100%',
        height:2
    },
    dot: {
        background:'black',
        display:'flex',
        left:'150px',
        position:'absolute',
        height:20,
        width:20,
        borderRadius:20,
    }
}))

const GamePage = (props) => {

    const classes = useStyles();

    const toggleGameView = () => {
        props.setGameView(!props.gameView)
    }

    const mockGameData = [
        {
            homeTeam: "Mavericks",
            homeScore: "88",
            awayTeam: "Knicks",
            awayScore: "105",
            timeRemaining: "2'",
            gameQuarter: "Q2",
            gameTime: "6'",
        }
    ]

    const getLogoUrl = (teamName) => {
        const teamData = nbaLogoMap.find(team => teamName.includes(team.mascot))
        return teamData.logoURL
    }


    var game = mockGameData.find(game => game.homeTeam === props.homeTeam) //default to state if no value
    // console.log(game)

    return (
        <div className={classes.wrapper}>
            <div className={classes.calibrateOverlay}>
            <div className={classes.modalBox}>
                <h2 className={classes.h2}>CALIBRATE LATENCY</h2>
                <div className={classes.slider}>
                    <div className={classes.line}></div>
                    <div className={classes.dot}></div>
                </div>
                <button className={classes.calibrate}>CONFIRM</button>
            </div>
            </div>

            <button className={`${classes.goBack} ${classes.buttonStyle}`} onClick={toggleGameView}><img className={classes.arrow} src='../assets/arrow.svg' alt='arrow'></img>See all games</button>

            <Grid container className={classes.gameInfo}>
                <Grid item xs={1} sm={3} className={classes.logoItems}>
                    <div className={classes.logoContainer}>
                        <img className={classes.logo} src={getLogoUrl(props.awayTeam)} alt='team logo'></img>
                    </div>
                    <div className={classes.changeColorPosition}>
                        <div className={classes.changeColor}><div class={classes.awayColor}></div>Change Color</div>
                    </div>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <div className={classes.nameScore}>
                        <p className={`${classes.text} ${classes.teamName}`}>{props.awayTeam}</p>
                        <p className={`${classes.text} ${classes.teamScore}`}>{game ? game.awayScore : ""}</p>
                    </div>
                </Grid>
                <Grid item xs={2} className={classes.timeItems}>
                    <div className={classes.timeContainer}>
                        <div className={classes.live}>
                            LIVE
                        </div>
                        <p className={classes.gameTime}>{game ? game.gameQuarter : ""} | {game ? game.gameTime : ""}</p>
                        <p className={classes.small}>Calibrate</p>
                    </div>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <div className={classes.nameScore}>
                        <p className={`${classes.text} ${classes.teamName}`}>{props.homeTeam}</p>
                        <p className={`${classes.text} ${classes.teamScore}`}>{game ? game.homeScore : ""}</p>
                    </div>
                </Grid>
                <Grid item xs={1} sm={3} className={classes.logoItems}>
                    <div className={classes.logoContainer}>
                        <img className={classes.logo} src={getLogoUrl(props.homeTeam)} alt='team logo'></img>
                    </div>
                    <div className={classes.changeColorPosition}>
                        <div className={classes.changeColor}><div class={classes.homeColor}></div>Change Color</div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default GamePage
