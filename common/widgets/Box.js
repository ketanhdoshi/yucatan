// -----------------------------------------------------------------
// Box component
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

import s from '../scss/Box.scss'

export const BOX_INFO = 1;

// -----------------------------------------------------------------
//      NOTE - TODO TODO TODO TODO
// 
// We should be able to put any set of elements as the content of
// not just the Body of the box, but also in the Footer and the Header
// To allow this, create three additional sub-components for Box.Header,
// Box.Footer and Box.Body similar to what React Bootstrap does
// -----------------------------------------------------------------

const Box = (props) => {
    let bg='';
    switch (props.bg) {
        case BOX_INFO:
            bg = s.boxInfo;
            break;
    }
    return (
        <div className={s.box + " " + bg}>
            <div className={s.boxHeader + " " + s.withBorder}>
                <h3 className={s.boxTitle}>{props.title}</h3>
            </div> {/* /.box-header */}
            <div className={s.boxBody}>
                {props.children}
            </div> {/* /.box-body */}
            <div className={s.boxFooter}>
                <button type="submit" className="btn btn-default">Cancel</button>
            </div> {/* /.box-footer */}
        </div> 
    )
}

Box.propTypes = {
}

export default Box