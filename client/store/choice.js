import axios from "axios";

// Action Types
const SUBMIT_CHOICE = 'SUBMIT_CHOICE';

// Action Creators
const _submitChoice = choice => {
  return {
    type: SUBMIT_CHOICE,
    choice
  };
};

// Thunks
export const submitChoice = (userId, itemId) => {
  return async dispatch => {
    const { data: choice } = await axios.post(`/api/choices`, {
      userId,
      itemId
    });
    dispatch(_submitChoice(choice));
    return choice;
  };
};

// Reducer export
export default function (state = {}, action) {
  switch (action.type) {
    case SUBMIT_CHOICE:
      return action.choice;
    default:
      return state;
  }
}
