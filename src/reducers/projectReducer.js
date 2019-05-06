import {
  GET_PROJECTS,
  GET_PROJECTS_BY_USER_ID,
  GET_PROPERTIES_BY_PROJECT_ID,
  ADD_PROJECT,
  ADD_PROJECT_FAIL,
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
    case GET_PROJECTS_BY_USER_ID:
      return {
        ...state,
        items: action.payload
      };
    case ADD_PROJECT:
      return {
        ...state,
        item: action.payload
      };
    case DELETE_PROJECT:
      return {
        ...state,
        item: action.payload
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
