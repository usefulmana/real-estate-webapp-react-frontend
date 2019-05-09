import {
  GET_PROJECTS,
  GET_PROJECTS_BY_USER_ID,
  ADD_PROJECT,
  ADD_PROJECT_FAIL,
  DELETE_PROJECT,
  UPDATE_PROJECT
} from './types';

import axios from 'axios';
import { returnErrors } from './errorActions';
import { 
  getAllProjectsAPI,
  getProjectByIdAPI,
  getProjectsByNameAPI,
  addAProjectAPI,
  deleteAProjectAPI,
  updateAProjectAPI
 } from '../data/apiroutes';

export function getProjects() {
  return function(dispatch) {
    fetch(getAllProjectsAPI)
      .then(res => res.json())
      .then(projects =>
        dispatch({
          type: GET_PROJECTS,
          payload: projects
        })
      );
  };
}

export function getProjectsByUserID(id) {
  return function(dispatch) {
    fetch(getAllProjectsAPI)
      .then(res => res.json())
      .then(projects =>
        dispatch({
          type: GET_PROJECTS_BY_USER_ID,
          payload: projects.filter(p => p.user === id)
        })
      );
  };
}

export const createProject = (projectData, token) => dispatch => {
  console.log(projectData, token);
  const config = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify(projectData);
  axios.post(addAProjectAPI, body, config).then(res =>
    dispatch({
      type: ADD_PROJECT,
      payload: res.data
    })
  );
};

export const deleteProject = (pid, uid) => dispatch => {
  const config = {
    method: 'delete',
    headers: {
      'x-auth-token': uid
    }
  };
  fetch(`${deleteAProjectAPI}/${pid}`, config)
    .then(res => res.json())
    .then(project =>
      dispatch({
        type: DELETE_PROJECT,
        payload: project
      })
    )
    .catch(err => console.log(err));
};
export const updateProject = ({
  name,
  owner,
  type,
  totalArea,
  startYear,
  endYear,
  token,
  id
}) => dispatch => {
  const config = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    name,
    owner,
    type,
    totalArea,
    startYear,
    endYear
  });
  axios.put(`${updateAProjectAPI}/${id}`, body, config)
    .then(res =>
      dispatch({
        type: UPDATE_PROJECT,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
  console.log('here');
};
