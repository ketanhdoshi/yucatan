// -----------------------------------------------------------------
// Presentational component for the dummy Payment page
// Should be cleaned up and re-written 
// -----------------------------------------------------------------
import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";

import { listPosts, selectAllPosts, selectPostsStatus, selectPostsError } from '../posts/postsSlice'

const PostView = () => {
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(selectPostsStatus);
    const postsError = useSelector(selectPostsError);
  
    const firstPost = posts.length ? posts[0] : {title: "gosh"}
  
    const dispatch = useDispatch();
    // Fetch the list of posts when the component is mounted, if the
    // API request has not been initiated previously.
    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(listPosts())
        }
    }, [postsStatus, dispatch])
  
    return (
        <div>
            <h5>Posts View</h5>
            <p>{postsStatus}{postsStatus == "failed" ? postsError: null}</p>

            <div className="well well-lg">{firstPost? firstPost.title : "nothing"}</div>
        </div>
    )
}

export default PostView
