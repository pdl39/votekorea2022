import axios from "axios";

// Action Types
const FETCH_RESULT_DATA = 'FETCH_RESULT_DATA';

// Action Creators
const _fetchResultData = resultData => {
  return {
    type: FETCH_RESULT_DATA,
    resultData
  };
};

// Thunks
export const fetchResultData = postId => {
  return async dispatch => {
    try {
      const { data: resultData } = await axios.get(`/api/result_data/${postId}`);

      dispatch(_fetchResultData(resultData));
      return resultData;
    }
    catch(err) {
      dispatch(_fetchResultData({ err }));
      return { err }
    }
  };
};

// Reducer export
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_RESULT_DATA:
      return action.resultData;
    default:
      return state;
  }
}
