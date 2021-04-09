// -----------------------------------------------------------------
// Matches page - Written as an example during the initial Redux experimentation.
// Should be cleaned up and re-written 
// -----------------------------------------------------------------
import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";

import { listMatches, selectAllMatches, selectMatchesStatus, selectMatchesError } from '../matches/matchesSlice'
import s from './MatchesView.scss';

const MatchesView = () => {
  const matches = useSelector(selectAllMatches);
  const matchesStatus = useSelector(selectMatchesStatus);
  const matchesError = useSelector(selectMatchesError);

  const dispatch = useDispatch();
  // Fetch the list of matches when the component is mounted, if the
  // API request has not been initiated previously.
  useEffect(() => {
    if (matchesStatus === 'idle') {
        dispatch(listMatches())
    }
  }, [matchesStatus, dispatch])

  return (
    <div>
        Matches
        <p>{matchesStatus}{matchesStatus == "failed" ? matchesError: null}</p>
        {matches &&
            <ul className="list-group">
                {matches.map(item =>
                    <li key={item.id} className="list-group-item" className={s.root}>
                        <span className="badge">{item.username}</span>
                        {item.name}
                    </li>
                )}
            </ul>
        }
   </div>
  );
}

export default MatchesView
