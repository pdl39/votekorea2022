import axios from "axios";

// Action Types
const FETCH_USER = 'FETCH_USER';

// Action Creators
const _fetchUser = user => {
  return {
    type: FETCH_USER,
    user
  };
};

// Thunks
export const fetchUser = accessToken => {
  return async dispatch => {
    try {
      const { data: user } = await axios.get(`/api/users/${userId}`);
      dispatch(_fetchUser(user));
      return user;
    }
    catch (err) {
      console.log(err);
    }
  };
};

// Reducer export
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.user;
    default:
      return state;
  }
}
