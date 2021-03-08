// -----------------------------------------------------------------
// Properties page
// -----------------------------------------------------------------
import React from 'react'
import { useSelector, useDispatch } from "react-redux";

// Action helpers
import { 
    getPropertiesReqAction, 
} from '../actions/action.js'

import s from '../scss/PropertiesView.scss';

const PropertiesView = () => {
    const properties = useSelector((state) => state.properties);

    const dispatch = useDispatch();
    const onClickCb = async values => {
        getPropertiesReqAction (dispatch)
    }
  
    return (
        <div>
            Properties
            <p>{properties.api}</p>
            {properties.list &&
                <ul className="list-group">
                    {properties.list.map(item =>
                        <li key={item._id} className="list-group-item" className={s.root}>
                            <span className="badge">{item.houseType}</span>
                            {item.description}
                        </li>
                    )}
                </ul>
            }

        <button type="button" onClick={onClickCb}>Get Properties!</button>
    </div>
    )
}

export default PropertiesView
