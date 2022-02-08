import axios from "axios";

// Action Types
const FETCH_POST = 'FETCH_POST';

// Action Creators
const _fetchPost = post => {
  return {
    type: FETCH_POST,
    post
  };
};

// Thunks
export const fetchPost = postId => {
  return async dispatch => {
    const { data: post } = await axios.get(`/api/posts/${postId}`);
    dispatch(_fetchPost(post));
    return post;
  };
};

// Reducer export
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      return action.post;
    default:
      return state;
  }
}
