// -----------------------------------------------------------------
// SmallBox component
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

import t from '../../scss/SmallBox.scss'

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

SmallBox.propTypes = {
}

export default SmallBox