// -----------------------------------------------------------------
// Presentational component for the Properties page
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

import s from '../scss/PropertiesView.scss';

const PropertiesView = ({ status, list, onClickCb }) => (
    <div>
        Properties
        <p>{status}</p>
        {list &&
            <ul className="list-group">
                {list.map(item =>
                    <li key={item.id} className="list-group-item" className={s.root}>
                        <span className="badge">{item.houseType}</span>
                        {item.description}
                    </li>
                )}
            </ul>
        }

       <button type="button" onClick={onClickCb}>Click Me!</button>
   </div>
)

PropertiesView.propTypes = {
    status: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(PropTypes.object.isRequired),
    onClickCb: PropTypes.func.isRequired,
}

export default PropertiesView
