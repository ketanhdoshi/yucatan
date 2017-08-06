// -----------------------------------------------------------------
// Presentational component for the UI Components - General page
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

import s from '../../scss/InfoBox.scss'
import t from '../../scss/SmallBox.scss'

// -----------------------------------------------------------------
// InfoBox component
// -----------------------------------------------------------------
const InfoBox = (props) => {
    let progressStyle = { width: props.pct };
    return (
        <div className={s.infoBox + " " + props.bg}>
            <span className={s.infoBoxIcon}><i className={"fa " + props.icon}></i></span>
            <div className={s.infoBoxContent}>
                <span className={s.infoBoxText}>{props.title}</span>
                <span className={s.infoBoxNumber}>{props.value}</span>

                <div className="progress">
                    <div className="progress-bar" style={progressStyle}></div>
                </div>
                <span className={s.progressDescription}>
                    {props.desc}
                </span>
            </div> {/* /.infoBoxContent */}                
        </div>            
    )
}

// -----------------------------------------------------------------
// SmallBox component
// -----------------------------------------------------------------
const SmallBox = (props) => {
    let supStyle = { fontSize: props.fs };
    return (
        <div className={t.smallBox + " " + props.bg}>
            <div className={t.inner}>
                <h3>{props.value}<sup style={supStyle}>{props.ss}</sup></h3>

                <p>{props.title}</p>
            </div>
            <div className={t.icon}>
                <i className={"ion " + props.icon}></i>
            </div>
            <a href="#" className={t.smallBoxFooter}>
                More info <i className="fa fa-arrow-circle-right"></i>
            </a>
        </div>
     )
}

// -----------------------------------------------------------------
// This component constructs the overall page. It is not meant to be
// a reusable widget, but an orchestrator for the widgets on this
// page.
// -----------------------------------------------------------------
const UiGeneralView = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <InfoBox bg="bg-blue" icon="fa-bookmark-o" title="Bookmarks" value="283" pct='50%' desc="50% Increase in 30 Days"/>
                </div> {/* /.col */}        
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <InfoBox bg="bg-green" icon="fa-desktop" title="Users" value="47865" pct='15%' desc="15% Improvement"/>
                </div> {/* /.col */}        
            </div>
            <div className="row">
                <div className="col-lg-3 col-xs-6">
                    <SmallBox bg="bg-green" title="Bounce Rate" value="43" ss='%' icon='ion-stats-bars' fs='20px'/>
                </div> {/* /.col */} 
            </div>
        </div>
    )
}

UiGeneralView.propTypes = {
}

export default UiGeneralView