import {
  GET_PROPERTIES,
  ADD_PROPERTY,
  DELETE_PROPERTY,
  UPDATE_PROPERTY
} from './types';

export function getProperties() {
  return function(dispatch) {
      console.log('property')
    fetch('http://localhost:3000/property')
      .then(res => res.json())
      .then(properties =>
        dispatch({
          type: GET_PROPERTIES,
          payload: properties
        })
      );
  };
}

export const createProperty = propertyData => dispatch => {
  fetch('http://localhost:3000/property', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify(propertyData)
  })
    .then(res => res.json())
    .then(property =>
      dispatch({
        type: ADD_PROPERTY,
        payload: property
      })
    );
};
