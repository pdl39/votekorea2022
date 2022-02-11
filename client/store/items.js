import axios from "axios";

// Action Types
const FETCH_ITEMS = 'FETCH_ITEMS';

// Action Creators
const _fetchItems = items => {
  return {
    type: FETCH_ITEMS,
    items
  };
};

// Thunks
export const fetchItems = postId => {
  try {
    return async dispatch => {
      const { data: items } = await axios.get(`/api/items/${postId}`);
      dispatch(_fetchItems(items));
      return items;
    };
  }
  catch(err) {
    dispatch(_fetchItems({ err }));
    return { err };
  }
};

// Reducer export
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.items;
    default:
      return state;
  }
}
