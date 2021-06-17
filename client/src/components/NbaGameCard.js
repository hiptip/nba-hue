import React, { useState } from 'react'

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import PickColors from './PickColors';


const useStyles = makeStyles({
    '@keyframes hover': {
        from: {
            boxShadow:'0 0 30px rgba(255,255,255,0)',
        },
        to: {
            boxShadow:'0 0 30px rgba(255,255,255,.7)',
        },
    },
    root: {
        // position: 'absolute',
        width: 600,
        left: 398,
        top: 231,
        background: 'rgba(255,255,255,0)',
        borderRadius: 5,
        fontFamily: 'Roboto Mono',
        fontStyle: 'normal',
        fontWeight: 'bold',
        transform: 'scale(1,1)',
        transition: 'transform .2s ease-out',
        overflow:'hidden',
        '&:hover': {
            animation: '$hover 1s infinite alternate ease-in-out',
            transform: 'scale(1.01,1.01)',
            transition: 'transform .2s ease-out'
        },
        '@media (max-width:600px)': {
            width: '100%',
            borderRadius: 0
        }
        // display: 'inline-block'
    },
    // awayTeam: {
    //     display: 'inline-block'
    // },
    // homeTeam: {
    //     display: 'inline-block'
    // },
    teamName: {
        fontFamily: 'Roboto Mono',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        margin:0,
        padding:0
        // lineHeight: 21,
        // display: 'flex',
        // alignItems: 'center'
    },
    score: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 70,
        padding:0,
        margin:0,
        lineHeight:'1em',
        letterSpacing:'-.03em'
    },
    centerSpread: {
        padding: 0,
        margin:0,
        background:'rgba(255,255,255,.2)',
        height:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        color:'white',
    },
    gameTime: {
        margin:0,
        padding:0,
    },
    // centerSpread: {
    //     alignItems: 'center'
    // },
    stats: {
        display: 'block',
        padding:20,
        background:'white'
    },
    vl: {
        position: 'relative',
        borderLeft: '2px solid #EFEFEF',
        height: 15.5,
        left: '50%'
    },
    logoAway: {
        background: 'url("https://www.nba.com/clippers/sites/clippers/files/lac-global-180705.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '130%',
        backgroundPosition: 'center',
        height: 150,
        width: '100%',
        border:'none!important',
    },
    logoHome: {
        background: 'url("https://vectorlogoseek.com/wp-content/uploads/2020/06/utah-jazz-vector-logo.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '130%',
        backgroundPosition: 'center',
        height: 150,
        width: '100%',
        border:'none!important',
        borderCollapse:'collapse!important'
    },
    selectButton: {
        position:'absolute',
        display:'block',
        // background:'black',
        textDecoration:'underline',
        textTransform:'uppercase',
        color:'white',
        bottom: 20,
        cursor:'pointer'
    }
});


const NbaGameCard = (props) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    // const routes = {
    //     '/': () => <Home />,
    //     '/teamOneColor': () => <SetColor />,
    //     '/teamTwoColor': () => <SetColor />,
    // };
    // const routeResults = useRoutes(routes);

    const toggleModal = () => {
        console.log()
        setIsOpen(true);
    }

    const closeScreen = () => {
        setIsOpen(false)
    }

    const setTeams = (hTeam, aTeam) => {
        toggleModal()
        props.setHomeTeam(hTeam)
        props.setAwayTeam(aTeam)
        props.setSingleGameData({
            homeTeam: props.homeTeam,
            awayTeam: props.awayTeam,
            homeScore: props.homeScore,
            awayScore: props.awayScore,
            gameTime: props.gameTime
        })
    }

    return (
        <div className={classes.root} >
            <Grid container onClick={() => setTeams(props.homeTeam, props.awayTeam)}>
                <Grid item xs={5}>
                    <div className={classes.awayTeam}>
                        <div className={classes.logoAway}></div>
                        <div className={classes.stats}>
                            <p className={classes.teamName}>{props.awayTeam}</p>
                            <p className={classes.score}>{props.awayScore}</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div className={classes.centerSpread}>
                        <div className={classes.verticalCenter}>
                            <p className={classes.gameTime}>{props.gameTime}</p>
                            <p className={classes.timeRemaining}>{ props.timeRemaining }</p>
                        </div>
                        <a className={classes.selectButton}>Select</a>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div className={classes.homeTeam}>
                        <div className={classes.logoHome}></div>
                        <div className={classes.stats}>
                            <p className={classes.teamName}>{props.homeTeam}</p>
                            <p className={classes.score}>{props.homeScore}</p>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <PickColors toggleModal={toggleModal} isOpen={isOpen} closeScreen={closeScreen} setAwayColor={props.setAwayColor} setHomeColor={props.setHomeColor} awayTeam={props.awayTeam} homeTeam={props.homeTeam} setGameView={props.setGameView} />
        </div>
    );
}

export default NbaGameCard
