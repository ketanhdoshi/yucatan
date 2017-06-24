
const posts = (state = {}, action) => {
  switch (action.type) {
    case 'GET_POST_REQ':
      return {
        postNo: action.postNo,
        api: "requesting"
      }
    case 'GET_POST_SUCCESS':
      return {
        post: action.post,
        api: "success"
      }
    default:
      return state
  }
}

export default posts
