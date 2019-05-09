import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Table, Button } from "reactstrap";
import { connect } from "react-redux";
import {
  getPropertiesByUserID,
  deleteProperty
} from "../../actions/propertyActions";
import Swal from "sweetalert2";
import PropertyForm from "../secondary/PropertyForm";
import EditProperty from "../secondary/EditProperty";
import { Link } from "react-router-dom";
import { getUserInfoByTokenAPI } from "../../data/apiroutes";

class PropertyManager extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.fetchProperties();
  }
  fetchProperties() {
    fetch(getUserInfoByTokenAPI, {
      headers: {
        "x-auth-token": `${this.props.auth.token}`
      }
    })
      .then(res => res.json())
      .then(json => this.props.getPropertiesByUserID(json._id));
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
        this.props.deleteProperty(id, this.props.auth.token);
        this.fetchProperties();
      }
    });
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const properties = this.props.properties.map(p => (
      <tr>
        <td>{p.address}</td>
        <td>{p.city}</td>
        <td>{p.price}</td>
        <td>{p.area}</td>
        <td>
          <div className="d-inline-block">
            <EditProperty property={p} />
          </div>
          {"     "}
          <Link to={`/propertyDetails/${p._id}`}>
            {" "}
            <Button
              outline
              color="info"
              size="sm"
              data-toggle="tooltip"
              title="Details"
            >
              <i class="fas fa-info-circle" />
            </Button>{" "}
            {"     "}
          </Link>
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
    ));
    const authLinks = (
      <Fragment>
        <div>
          <div className="text-right">
            <PropertyForm />
          </div>
          <Table className="text-center">
            <thead>
              <tr>
                <th>Address</th>
                <th>City</th>
                <th>Price</th>
                <th>Area</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{properties}</tbody>
          </Table>
        </div>
      </Fragment>
    );
    const guestLinks = (
      <Fragment>
        <h2 className="text-center"> Please Log In To View This Page</h2>
      </Fragment>
    );
    return (
      <PropertyManagerWrapper>
        <div className="project">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </PropertyManagerWrapper>
    );
  }
}

const PropertyManagerWrapper = styled.div`
  .project {
    margin-top: -2rem;
  }
`;
const mapStateToProps = state => ({
  properties: state.properties.items,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getPropertiesByUserID, deleteProperty }
)(PropertyManager);
