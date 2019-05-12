import {
  GET_PROPERTIES,
  ADD_PROPERTY,
  GET_PROPERTIES_BY_USER_ID,
  GET_PROPERTIES_BY_PROJECT_ID,
  GET_PROPERTIES_BY_ADDRESS,
  GET_PROPERTY_BY_ID,
  DELETE_PROPERTY,
  UPDATE_PROPERTY
} from './types';
import axios from 'axios';
import {
  getAllPropertiesAPI,
  getPropertiesByAddressAPI,
  getPropertyByIdAPI,
  addAPropertyAPI,
  updateAPropertyAPI,
  deleteAPropertyAPI
} from './../data/apiroutes';
export function getProperties() {
  return function(dispatch) {
    fetch(getAllPropertiesAPI)
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
    fetch(getAllPropertiesAPI)
      .then(res => res.json())
      .then(properties =>
        dispatch({
          type: GET_PROPERTIES_BY_USER_ID,
          payload: properties.filter(p => p.user === id)
        })
      );
  };
}
export function getPropertiesByID(id) {
  return function(dispatch) {
    fetch(getPropertyByIdAPI + `/${id}`)
      .then(res => res.json())
      .then(property =>
        dispatch({
          type: GET_PROPERTY_BY_ID,
          payload: property
        })
      );
  };
}
export function getPropertiesByAddress(address) {
  return function(dispatch) {
    if (address == undefined) {
      fetch(`${getPropertiesByAddressAPI}/`)
        .then(res => res.json())
        .then(property =>
          dispatch({
            type: GET_PROPERTIES_BY_ADDRESS,
            payload: property
          })
        );
    } else {
      fetch(`${getPropertiesByAddressAPI}/${address}`)
        .then(res => res.json())
        .then(property =>
          dispatch({
            type: GET_PROPERTIES_BY_ADDRESS,
            payload: property
          })
        );
    }
  };
}
export function getPropertiesByProjectID(id) {
  return function(dispatch) {
    fetch(getAllPropertiesAPI)
      .then(res => res.json())
      .then(properties =>
        dispatch({
          type: GET_PROPERTIES_BY_PROJECT_ID,
          payload: properties.filter(p => p.project === id)
        })
      );
  };
}
export const createProperty = (propertyData, token) => dispatch => {
  fetch(addAPropertyAPI, {
    method: 'POST',
    headers: {
      'x-auth-token': token,
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
  fetch(`${deleteAPropertyAPI}/${pid}`, config)
    .then(res => res.json())
    .then(property =>
      dispatch({
        type: DELETE_PROPERTY,
        payload: property
      })
    )
    .catch(err => console.log(err));
};
export const updateProperty = ({
  title,
  price,
  area,
  numOfBedrooms,
  numOfBathrooms,
  direction,
  address,
  city,
  province,
  project,
  imageURL,
  token,
  id
}) => dispatch => {
  const config = {
    headers: {
      'x-auth-token': token,
      'Content-type': 'application/json'
    }
  };
  const body = JSON.stringify({
    title,
    price,
    area,
    numOfBedrooms,
    numOfBathrooms,
    direction,
    address,
    city,
    province,
    project,
    imageURL
  });
  axios
    .put(`${updateAPropertyAPI}/${id}`, body, config)
    .then(res =>
      dispatch({
        type: UPDATE_PROPERTY,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};
