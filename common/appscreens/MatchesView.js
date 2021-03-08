// -----------------------------------------------------------------
// Matches page - Written as an example during the initial Redux experimentation.
// Should be cleaned up and re-written 
// -----------------------------------------------------------------
import React from 'react'
import { useSelector, useDispatch } from "react-redux";

// Action helpers
import { 
  getMatchesReqAction, 
  getPostReqAction, 
} from '../actions/action.js'

import s from '../scss/MatchesView.scss';

// -----------------------------------------------------------------
// Used to be called on Router's onEnter callback before entering the Matches route 
// !!!!!!!!! Since onEnter is no longer supported, reimplement this using Router render={}
// -----------------------------------------------------------------
const getMatches = (store) => {
  return (nextState, replace) => {
    // Do something with your store
    
    // The URL for the route that we are about to enter
    console.log (nextState.location.pathname)
    
    // Action to get the list of Matches
    getMatchesReqAction (store.dispatch, 6)
  }
};

const MatchesView = () => {
  const matches = useSelector((state) => state.matches);
  const posts = useSelector((state) => state.posts);
  const post = posts.post ? posts.post : {title: "gosh"}

  const dispatch = useDispatch();
  const onClickCb = async values => {
    getPostReqAction (dispatch, 4)
  }
  const onfetchCb = async values => {
    getMatchesReqAction (dispatch, 17)
  }

  return (
    <div>
        Matches
        <p>{matches.api}</p>
        {matches.list &&
            <ul className="list-group">
                {matches.list.map(item =>
                    <li key={item.id} className="list-group-item" className={s.root}>
                        <span className="badge">{item.username}</span>
                        {item.name}
                    </li>
                )}
            </ul>
        }

       <div className="well well-lg">{post? post.title : "nothing"}</div>
       <button type="button" onClick={onClickCb}>Get Posts!</button>
       <button type="button" onClick={onfetchCb}>Get Matches!</button>
   </div>
  );
}

export default MatchesView
