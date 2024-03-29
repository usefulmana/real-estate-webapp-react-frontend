import {
  GET_PROPERTIES,
  ADD_PROPERTY,
  GET_PROPERTIES_BY_USER_ID,
  GET_PROPERTIES_BY_PROJECT_ID,
  GET_PROPERTY_BY_ID,
  GET_PROPERTIES_BY_ADDRESS,
  DELETE_PROPERTY,
  UPDATE_PROPERTY
} from '../actions/types';

const initialState = {
  items: [],
  item: {},
  itemsProjectID: []
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
    case GET_PROPERTIES_BY_ADDRESS:
      return {
        ...state,
        items: action.payload
      };
    case GET_PROPERTIES_BY_PROJECT_ID:
      return {
        ...state,
        itemsProjectID: action.payload
      };
    case GET_PROPERTY_BY_ID:
      return {
        ...state,
        item: action.payload
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
