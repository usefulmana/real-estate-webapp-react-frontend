import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
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
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login">
                    <button className="btn btn-link"> LOG IN</button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register">
                    <button className="btn register"> REGISTER</button>
                  </Link>
                </li>
              </ul>
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
  .register:hover {
    transform: scale(1.05);
  }
  .register {
    background-color: #df2b2b;
  }
`;
