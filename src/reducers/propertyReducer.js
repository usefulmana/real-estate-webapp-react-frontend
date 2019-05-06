import {
  GET_PROPERTIES,
  ADD_PROPERTY,
  GET_PROPERTIES_BY_USER_ID,
  DELETE_PROPERTY,
  UPDATE_PROPERTY
} from '../actions/types';

const initialState = {
  items: [],
  item: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROPERTIES:
      return {
        ...state,
        items: action.payload
      };
    case GET_PROPERTIES_BY_USER_ID:
      return {
        ...state,
        items: action.payload
      };
    case ADD_PROPERTY:
      return {
        ...state,
        item: action.payload
      };
    case DELETE_PROPERTY:
      return {
        ...state,
        item: action.payload
      };
    case UPDATE_PROPERTY:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
