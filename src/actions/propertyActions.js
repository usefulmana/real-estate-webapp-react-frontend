import {
  GET_PROPERTIES,
  ADD_PROPERTY,
  GET_PROPERTIES_BY_USER_ID,
  GET_PROPERTIES_BY_PROJECT_ID,
  DELETE_PROPERTY,
  UPDATE_PROPERTY
} from './types';

export function getProperties() {
  return function(dispatch) {
    console.log('property');
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
export function getPropertiesByUserID(id) {
  return function(dispatch) {
    fetch('http://localhost:3000/property')
      .then(res => res.json())
      .then(properties =>
        dispatch({
          type: GET_PROPERTIES_BY_USER_ID,
          payload: properties.filter(p => p.user === id)
        })
      );
  };
}
export function getPropertiesByProjectID(id) {
  return function(dispatch) {
    fetch('http://localhost:3000/property')
      .then(res => res.json())
      .then(properties =>
        dispatch({
          type: GET_PROPERTIES_BY_PROJECT_ID,
          payload: properties.filter(p => p.project === id)
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
export const deleteProperty = (pid, uid) => dispatch => {
  const config = {
    method: 'delete',
    headers: {
      'x-auth-token': uid
    }
  };
  fetch(`http://localhost:3000/property/${pid}`, config)
    .then(res => res.json())
    .then(property =>
      dispatch({
        type: DELETE_PROPERTY,
        payload: property
      })
    )
    .catch(err => console.log(err));
};
export const updateProject = (pid, uid) => dispatch => {
  const config = {
    method: 'put',
    headers: {
      'x-auth-token': uid
    }
  };
  fetch(`http://localhost:3000/property/${pid}`, config)
    .then(res => res.json())
    .then(property =>
      dispatch({
        type: UPDATE_PROPERTY,
        payload: property
      })
    )
    .catch(err => console.log(err));
};
