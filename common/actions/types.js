// -----------------------------------------------------------------
// This file contains the Action objects which are used by the Action Helpers
// to pass to the dispatcher
// -----------------------------------------------------------------

// -----------------------------------------------------------------
// REQ action object for GET_PROPERTIES
// -----------------------------------------------------------------
export const getPropertiesReq = () => ({
  type: 'GET_PROPERTIES_REQ',
})

// -----------------------------------------------------------------
// SUCCESS action object for GET_PROPERTIES
// -----------------------------------------------------------------
export const getPropertiesSuccess = (propertyList) => ({
  type: 'GET_PROPERTIES_SUCCESS',
  propertyList: propertyList
})

// -----------------------------------------------------------------
// ERROR action object for GET_PROPERTIES
// -----------------------------------------------------------------
export const getPropertiesError = (error) => ({
  type: 'GET_PROPERTIES_ERROR',
  error: error
})

// -----------------------------------------------------------------
// REQ action object for GET_MATCHES
// -----------------------------------------------------------------
export const getMatchesReq = (pageNo) => ({
  type: 'GET_MATCHES_REQ',
  pageNo: pageNo
})

// -----------------------------------------------------------------
// SUCCESS action object for GET_MATCHES
// -----------------------------------------------------------------
export const getMatchesSuccess = (userList) => ({
  type: 'GET_MATCHES_SUCCESS',
  userList: userList
})

// -----------------------------------------------------------------
// REQ action object for GET_POSTS
// -----------------------------------------------------------------
export const getPostReq = (postNo) => ({
  type: 'GET_POST_REQ',
  postNo: postNo
})

// -----------------------------------------------------------------
// SUCCESS action object for GET_POSTS
// -----------------------------------------------------------------
export const getPostSuccess = (post) => ({
  type: 'GET_POST_SUCCESS',
  post: post
})
