import {
  GET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT
} from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        items: action.payload
      };
    case ADD_PROJECT:
      return {
          ...state,
          item: action.payload
      }
    default:
      return state;
  }
}
