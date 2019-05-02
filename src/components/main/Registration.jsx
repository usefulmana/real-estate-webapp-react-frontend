import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
export default class Registration extends Component {
  render() {
    return (
      <LoginWrapper>
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-4 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <div className="text-center top-icon">
                  <Link to="/">
                    <i className="navbar-brand fas fa-home"> HOMELY</i>
                  </Link>
                </div>
                <h5 className="card-title text-center">Registration</h5>
                <form action="#" className="form-signin">
                  <div className="form-label-group">
                    <input
                      type="name"
                      id="inputName"
                      className="form-control"
                      placeholder="Name"
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="phone"
                      id="inputPhone"
                      className="form-control"
                      placeholder="Phone #"
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputRetypePassword"
                      className="form-control"
                      placeholder="Retype Password"
                      required
                    />
                  </div>

                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </LoginWrapper>
    );
  }
}
const LoginWrapper = styled.div`
.top-icon i:hover{
    transform:scale(1.1)
  }
.top-icon i{
    color: #f93838 !important;
    font-size: 25px;
    margin-bottom: 1rem;
  }
.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}
.btn-danger{
  background:#F93838 !important;
}import NavBar from '../secondary/NavBar';

`;
