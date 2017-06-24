// -----------------------------------------------------------------
// Presentational component for header of the content area
// which contains the breadcrumb
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

import s from '../../scss/ContentHeader.scss'

const ContentHeader = (props) => (
    <section className={s.contentHeader}>
        <h1>
            {props.header}
            <small>Preview page</small>
        </h1>
        <ol className={"breadcrumb " + s.breadcrumb}>
            <li><a href="#"><i className={"fa fa-dashboard " + s.fa}></i> Home</a></li>
            <li className="active">{props.header}</li>
        </ol>
    </section>
)

export default ContentHeader
