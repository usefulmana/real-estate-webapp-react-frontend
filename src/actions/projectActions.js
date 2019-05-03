import {
  GET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT
} from './types';

export function getProjects() {
  return function(dispatch) {
    fetch('http://localhost:3000/project')
      .then(res => res.json())
      .then(projects =>
        dispatch({
          type: GET_PROJECTS,
          payload: projects
        })
      );
  };
}

export const createProject = projectData => dispatch => {
  fetch('http://localhost:3000/project', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify(projectData)
  })
    .then(res => res.json())
    .then(project =>dispatch ({
        type: ADD_PROJECT,
        payload: project
    }));
};
