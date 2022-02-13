import axios from "axios";

// LocalStorage Items
const PRECHOICE_POST_ID = 'preChoicePostId';
const PRECHOICE_ITEM_ID = 'preChoiceItemId';

// Action Types
const FETCH_CHOICE = 'FETCH_CHOICE';
const SUBMIT_CHOICE = 'SUBMIT_CHOICE';
const REMOVE_CHOICE = 'REMOVE_CHOICE';

// Action Creators
const _fetchChoice = choice => {
  return {
    type: FETCH_CHOICE,
    choice
  };
};

const _submitChoice = choice => {
  return {
    type: FETCH_CHOICE,
    choice
  };
};

const _removeChoice = choice => {
  return {
    type: FETCH_CHOICE,
    choice
  };
};

// Thunks
export const fetchChoice = (userId, postId) => {
  return async dispatch => {
    try {
      const { data: choice } = await axios.get(`/api/choices/?userId=${userId}&postId=${postId}`);

      dispatch(_fetchChoice(choice));
      return choice;
    }
    catch(err) {
      dispatch(_fetchChoice({ err }));
      return { err };
    }
  };
};

export const submitChoice = (userId, postId, itemId) => {
  return async dispatch => {
    try {
      const { data: choice } = await axios.post(`/api/choices`, {
        chosenItemId: itemId,
        userId,
        postId
      });

      // Remove pre-login choices from local storage:
      window.localStorage.removeItem(PRECHOICE_POST_ID);
      window.localStorage.removeItem(PRECHOICE_ITEM_ID);

      dispatch(_submitChoice(choice));
      return choice;
    }
    catch(err) {
      dispatch(_submitChoice({ err }));
      return { err };
    }
  };
};

export const removeChoice = (userId, postId) => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/api/choices/?userId=${userId}&postId=${postId}`);

      // Remove pre-login choices from local storage:
      window.localStorage.removeItem(PRECHOICE_POST_ID);
      window.localStorage.removeItem(PRECHOICE_ITEM_ID);

      dispatch(_removeChoice({}));
      return data;
    }
    catch(err) {
      dispatch(_removeChoice({ err }));
      return { err };
    }
  };
};

// Reducer export
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_CHOICE:
      return action.choice;
    case SUBMIT_CHOICE:
      return action.choice;
    case REMOVE_CHOICE:
      return action.choice;
    default:
      return state;
  }
}
