import axios from "axios";

// Action Types
const FETCH_ITEM = 'FETCH_ITEM';

// Action Creators
const _fetchItem = item => {
  return {
    type: FETCH_ITEM,
    item
  };
};

// Thunks
export const fetchItem = (itemId) => {
  try {
    return async dispatch => {
      const { data: item } = await axios.get(`/api/items/?itemId=${itemId}`);
      dispatch(_fetchItem(item));
      return item;
    };
  }
  catch(err) {
    dispatch(_fetchItem({ err }));
    return { err };
  }
};

// Reducer export
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_ITEM:
      return action.item;
    default:
      return state;
  }
}
