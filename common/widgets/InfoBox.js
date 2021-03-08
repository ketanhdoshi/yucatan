// -----------------------------------------------------------------
// InfoBox component
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

import s from '../scss/InfoBox.scss'

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

InfoBox.propTypes = {
}

export default InfoBox