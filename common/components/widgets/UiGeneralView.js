// -----------------------------------------------------------------
// Presentational component for the UI Components - General page
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

import s from '../../scss/InfoBox.scss'

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

const UiGeneralView = () => {
    return (
        <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-12">
                <InfoBox bg="bg-blue" icon="fa-bookmark-o" title="Bookmarks" value="283" pct='50%' desc="50% Increase in 30 Days"/>
            </div> {/* /.col */}        
            <div className="col-md-3 col-sm-6 col-xs-12">
                <InfoBox bg="bg-green" icon="fa-desktop" title="Users" value="47865" pct='15%' desc="15% Improvement"/>
            </div> {/* /.col */}        
        </div>
    )
}

UiGeneralView.propTypes = {
}

export default UiGeneralView