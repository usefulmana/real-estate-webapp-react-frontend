import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Table, Button } from "reactstrap";
import { connect } from "react-redux";
import {
  getProjectsByUserID,
  deleteProject
} from "../../actions/projectActions";
import Swal from "sweetalert2";
import ProjectForm from "../secondary/ProjectForm";
import EditProject from "../secondary/EditProject";
import { getUserInfoByTokenAPI } from "../../data/apiroutes";
import JwPagination from 'jw-react-pagination'

class ProjectManager extends Component {
  constructor() {
    super();
    this.state = {
      pageOfItems: []
    }
    this.onChangePage = this.onChangePage.bind(this);
  }
  onChangePage(pageOfItems) {
    // update local state with new page of items
    this.setState({ pageOfItems });
  }

  componentDidMount() {
    this.fetchProjects();
  }
  fetchProjects() {
    fetch(getUserInfoByTokenAPI, {
      headers: {
        "x-auth-token": `${this.props.auth.token}`
      }
    })
      .then(res => res.json())
      .then(json => this.props.getProjectsByUserID(json._id));
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
        this.props.deleteProject(id, this.props.auth.token);
        this.fetchProjects();
      }
    });
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Fragment>
        <div>
          <div className="text-right">
            <ProjectForm />
          </div>
          <Table className="text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Owner</th>
                <th>Type</th>
                <th>Area</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.state.pageOfItems.map(p =>
              <tr>
                <td>{p.name}</td>
                <td>{p.owner}</td>
                <td>{p.type}</td>
                <td>{p.totalArea}</td>
                <td>
                  <div className="d-inline-block">
                    <EditProject project={p} />
                  </div>
                  {"     "}
                  <Button
                    outline
                    color="info"
                    size="sm"
                    data-toggle="tooltip"
                    title="View all properties belong to this project"
                  >
                    <i class="fas fa-info-circle" />
                  </Button>{" "}
                  {"     "}
                  <Button
                    outline
                    color="danger"
                    size="sm"
                    data-toggle="tooltip"
                    title="Delete"
                    onClick={this.handleDelete.bind(this, p._id)}
                  >
                    <i class="far fa-trash-alt" />
                  </Button>
                </td>
              </tr>
            )}</tbody>
          </Table>
          <div className="text-center">
            <JwPagination items={this.props.projects} onChangePage={this.onChangePage} pageSize={5} />
          </div>
         
       
        </div>
      </Fragment>
    );
    const guestLinks = (
      <Fragment>
        <h2 className="text-center"> Please Log In To View This Page</h2>
      </Fragment>
    );

    return (
      <ProjectManagerWrapper>
        <div className="project">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
     
      </ProjectManagerWrapper>
    );
  }
}

const ProjectManagerWrapper = styled.div`
  .project {
    margin-top: -2rem;
  }
`;
const mapStateToProps = state => ({
  projects: state.projects.items,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getProjectsByUserID, deleteProject }
)(ProjectManager);
