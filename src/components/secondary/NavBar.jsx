import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import Registration from '../main/Registration'
import Login from '../main/Login'
import Logout from '../main/Logout'
class NavBar extends Component {
  state = {
    isOpen: false
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = ( 
      <Fragment>
        <div className="nav-item ml-auto">
            <span className='navbar-text mr-3 '>
              <strong>{user ? `Welcome, ${user.name}!` : ''}</strong>
            </span>
        </div>
        <div className="nav-item">
          <Logout/>
        </div>
      </Fragment>
      )
    
    const guestLinks = (
      <Fragment>
        <div className="nav-item ml-auto">
          <Login />
        </div>
        <div className="nav-item">
          <Registration />
        </div>
      </Fragment>
    );


    return (
      <NavBarWrapper>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark">
            <Link to="/">
              <i className="navbar-brand fas fa-home"> HOMELY</i>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContentLG"
              aria-controls="navbarSupportedContentLG"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContentLG"
            >
                {isAuthenticated ? authLinks : guestLinks}
            </div>
          </nav>
        </div>
      </NavBarWrapper>
    );
  }
}

const NavBarWrapper = styled.div`
  nav {
    background: #f93838;
  }
  .btn {
    color: white !important;
    font-weight: 500;

  }
`;
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(NavBar);