import React, { useState } from 'react'
import WaitingScreen from './WaitingScreen'
import { makeStyles } from "@material-ui/core/styles";
import BGImage from '../assets/bg1.svg';
import BBall from '../assets/splash-basketball.svg'
import Static from '../assets/splash-lockup.svg'
import Wordmark from '../assets/splash-wordmark.svg'
import BridgeGif from '../assets/philips-loader.gif'
import ChooseLights from './ChooseLights';

const useStyles = makeStyles({
    "@keyframes gradient": {
        "0%": {
            backgroundPosition: '0% 50%'
        },
        "50%": {
            backgroundPosition: '100% 50%'
        },
        "100%": {
            backgroundPosition: '0% 50%'
        }
    },
    "@keyframes rotate": {
        "0%": {
            transform: 'rotate(0deg)',
        },
        "100%": {
            transform: 'rotate(360deg)',
        }
    },
    "@keyframes glow": {
        "0%": {
            transform: 'rotate(0deg)',
            filter: 'blur(0px)',
        },
        "10%": {
            filter: 'blur(8px)',
        },
        "20%": {
            filter: 'blur(1px)',
        },
        "30%": {
            filter: 'blur(5px)',
        },
        "40%": {
            filter: 'blur(6px)',
        },
        "50%": {
            filter: 'blur(4px)',
        },
        "60%": {
            filter: 'blur(8px)',
        },
        "70%": {
            filter: 'blur(4px)',
        },
        "80%": {
            filter: 'blur(6px)',
        },
        "90%": {
            filter: 'blur(2px)',
        },
        "100%": {
            transform: 'rotate(360deg)',
            filter: 'blur(0px)',
        }
    },
    background: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'auto',
        backgroundImage: `linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)`,
        backgroundPosition: 'center, center',
        backgroundSize: '400% 400%',
        backgroundRepeat: 'no-repeat, no-repeat',
        animation: '$gradient 15s ease infinite',
        fontFamily: 'Roboto Mono'

    },
    lockup: {
        display: 'flex',
        align: 'center',
        // filter: 'dropShadow(50px 5px 5px #222)' get this working
    },
    ballComp: {
        display:'inline-block',
        position:'relative',
        width:'25%',
        marginRight:'5%'
    },
    ballOutline: {
        display:'block',
        position:'absolute',
        animation: '$rotate 60s linear infinite'
    },
    force: {
        display:'block',
        position:'relative',
        opacity:'0'
    },
    ballGlow: {
        display:'block',
        position:'absolute',
        filter: 'blur(5px)',
        animation: '$glow 60s linear infinite'
    },
    ball: {
        display:'inline-block',
        width:'25%',
        marginRight:'5%',
        animation: '$rotate 60s linear infinite'
    },
    wordmark: {
        display:'inline-block',
        width:'70%'
    },
    lines: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'auto',
        backgroundImage: `url(${BBall})`,
        backgroundPosition: 'center',
        backgroundSize: '250% 250%',
        backgroundRepeat: 'no-repeat',
        opacity: 0.05,
        boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.5)'

    },
    center: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width:'400px'
    },
    staticImage: {
        width: '100%',
        paddingBottom: 40,
        // filter: 'dropShadow(50px 5px 5px #222)' get this working
    },
    button: {
        marginTop:'40px',
        backgroundColor: 'rgba(0,0,0,1)',
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        borderRadius: '100px',
        width: 230,
        fontFamily: 'Roboto Mono',
        fontWeight: 500,
        '&:hover': {
            backgroundColor: 'rgba(255,255,255,0)',
            cursor:'pointer',
            boxShadow: '0px 0px 60px rgba(255, 255, 255, 1), inset 0px 0px 20px rgba(0, 0, 200, .2)',
            transition: 'box-shadow ease-out .5s',
        },
    },
    modalBox: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width:'1000px',
        padding:'50px',
        height:'auto',
        borderRadius: 20,
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        backgroundColor: "none",
        '@media (max-width:600px)': {
            width: '100%',
        },
    },
    loader: {
        width: "100px",
        display:'block',
        margin:'0 auto 40px'
    },
    info: {
        margin: 'auto',
        bottom: "20%",
        width:'80%',
        right: 0,
        left: 0,
        fontSize: '1.5rem',
        color:'white',
        '@media (min-width:600px)': {
            fontSize: '1.5rem',
        },
    }
})

const ConnectHue = (props) => {
    const classes = useStyles();
    const [intervalId, setIntervalId] = useState()
    const [waiting, setWaiting] = useState(false)
    // const [bridgeIp, setBridgeIp] = useState()
    const [hueConnected, setHueConnected] = useState(true)
    const [lights, setLights] = useState({})

    const getBridgeApi = () => {
        setWaiting(true)
        fetch("https://discovery.meethue.com/")
            .then(res => res.json())
            .then(res => linkHue(res))
    }

    const linkHue = (res) => {
        const ip = res[0].internalipaddress
        props.setBridgeIp(ip)
        const intId = setInterval(() => {
            fetch(`http://${ip}/api`, {
                method: 'POST',
                body: JSON.stringify({ "devicetype": "hue-nba" })
            })
                .then(res => res.json())
                .then(res => checkSuccess(res, ip))
        }, 3000)
        setIntervalId(intId)
        setTimeout(() => {
            clearInterval(intId)
        }, 30000)
    }

    const getLights = (ip) => {
        fetch(`https://${ip}/api/${props.hueUsername}/lights`)
            .then(res => res.json())
            .then(res => setLights(res))

    }

    const checkSuccess = (res, ip) => {
        const obj = res[0]
        if ('success' in obj) {
            clearInterval(intervalId)
            localStorage.setItem('hueUsername', obj["success"]["username"])
            props.setHueUsername(obj["success"]["username"])
            setHueConnected(true)
            getLights(ip)
        }
    }

    return (
        <div className={classes.background}>
            <div className={classes.lines}></div>
            {}
            {(!waiting && !hueConnected) &&
                <div>
                    <div className={classes.center}>
                        <div className={classes.lockup}>
                            <div className={classes.ballComp}>
                                <img className={classes.ballOutline} src={BBall} alt="" />
                                <img className={classes.ballGlow} src={BBall} alt="" />
                                <img className={classes.force} src={BBall} alt="" />
                            </div>
                            <img className={classes.wordmark} src={Wordmark} alt="" />
                        </div>
                        <button className={classes.button} onClick={getBridgeApi}>Start Pairing</button>
                    </div>

                </div>
            }
            {(waiting && !hueConnected) &&
                <div className={classes.modalBox}>
                    <img className={classes.loader} src={BridgeGif} alt="" />
                    <p className={classes.info}>Click the button on your hub to pair</p>
                </div>
            }
            {hueConnected &&
                <ChooseLights lights={lights} setCheckedLights={props.setCheckedLights} setHueConfigured={props.setHueConfigured} />
            }
        </div>
    )
}

export default ConnectHue
