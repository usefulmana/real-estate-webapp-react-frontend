import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Table, Button } from 'reactstrap';
import { connect } from 'react-redux'
import {getProjectsByUserID, deleteProject} from '../../actions/projectActions'
import Swal from 'sweetalert2'
import ProjectForm from '../secondary/ProjectForm';
import EditProject from '../secondary/EditProject';



const deleteURL = 'http://localhost:3000/project'
class ProjectManager extends Component {
  constructor(){
    super()
    this.state = {
    }
  }
  componentDidMount() {
    this.fetchProjects()
  }
  fetchProjects(){
    fetch('http://localhost:3000/auth/user', {
      headers: {
        'x-auth-token': `${this.props.auth.token}`
      }
    }).then(res => res.json()).then(json => this.props.getProjectsByUserID(json._id));
  }
  handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to undo this operation",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    }).then(result => {
      if (result.value) {
        this.props.deleteProject(id,this.props.auth.token)
        this.fetchProjects()
      }
    });
  }
  render() {
    const projects = this.props.projects.map(p => (
      <tr>
        <td>{p.name}</td>
        <td>{p.owner}</td>
        <td>{p.type}</td>
        <td>{p.totalArea}</td>
        <td>
          <div className="d-inline-block"><EditProject project={p}/></div>{'     '}
          <Button outline color="info" size='sm' data-toggle="tooltip" title="View all properties belong to this project"><i class="fas fa-info-circle"></i></Button> {'     '}
          <Button outline color="danger" size='sm' data-toggle="tooltip" title="Delete" onClick={this.handleDelete.bind(this, p._id)}>
            <i class="far fa-trash-alt"></i>
          </Button>
        </td>
      </tr>
    ))
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Fragment>
        <div>
          <div className='text-right'> 
            <ProjectForm/>
          </div>
          <Table className='text-center'>
            <thead>
              <tr >
                <th>Name</th>
                <th>Owner</th>
                <th>Type</th>
                <th>Area</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects}
            </tbody>
          </Table>
        </div>
      </Fragment>
    )
    const guestLinks = (
        <Fragment>
          <h2 className='text-center'> Please Log In To View This Page</h2>
        </Fragment>
      )
  
    return (
      <ProjectManagerWrapper>
        <div className='project'>{isAuthenticated ? authLinks : guestLinks}</div>
      </ProjectManagerWrapper>
    )
  }
}

const ProjectManagerWrapper = styled.div`
.project{
  margin-top: -2rem;
}
`
const mapStateToProps = state => ({
  projects: state.projects.items,
  auth: state.auth
})
export default connect(mapStateToProps, { getProjectsByUserID, deleteProject})(ProjectManager)