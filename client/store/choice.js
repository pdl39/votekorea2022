import axios from "axios";

// LocalStorage Items
const PRECHOICE_POST_ID = 'preChoicePostId';
const PRECHOICE_ITEM_ID = 'preChoiceItemId';

// Action Types
const SET_CHOICE = 'SET_CHOICE';

// Action Creators
const _setChoice = choice => {
  return {
    type: SET_CHOICE,
    choice
  };
};

// Thunks
export const fetchChoice = (userId, postId) => {
  return async dispatch => {
    console.log('inside fetchChoice dispatch. userId: ', userId);
    try {
      const { data: choice } = await axios.get(`/api/choices/?userId=${userId}&postId=${postId}`);
      dispatch(_setChoice(choice));
      return choice;
    }
    catch(err) {
      dispatch(_setChoice({ err }));
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

      dispatch(_setChoice(choice));
      return choice;
    }
    catch(err) {
      dispatch(_setChoice({ err }));
      return { err };
    }
  };
};

export const removeChoice = (userId, postId) => {
  console.log({userId, postId});
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/api/choices/?userId=${userId}&postId=${postId}`);

      // Remove pre-login choices from local storage:
      window.localStorage.removeItem(PRECHOICE_POST_ID);
      window.localStorage.removeItem(PRECHOICE_ITEM_ID);

      dispatch(_setChoice({}));
      return data;
    }
    catch(err) {
      dispatch(_setChoice({ err }));
      return { err };
    }
  };
};

// Reducer export
export default function (state = {}, action) {
  switch (action.type) {
    case SET_CHOICE:
      return action.choice;
    default:
      return state;
  }
}
