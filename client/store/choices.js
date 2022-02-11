import axios from "axios";

// Action Types
const FETCH_CHOICES = 'FETCH_CHOICES';

// Action Creators
const _fetchChoices = choices => {
  return {
    type: FETCH_CHOICES,
    choices
  };
};

// Thunks
export const fetchChoices = postId => {
  return async dispatch => {
    try {
      const { data: choices } = await axios.get(`/api/choices/${postId}`);
      dispatch(_fetchChoices(choices));
      return choices;
    }
    catch(err) {
      dispatch(_fetchChoices({ err }));
      return { err }
    }
  };
};

// Reducer export
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_CHOICES:
      return action.choices;
    default:
      return state;
  }
}
