import React, { Component } from "react";
import styled from "styled-components";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateInfo } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import Swal from "sweetalert2";
import { getUserInfoByTokenAPI } from "../../data/apiroutes";

class EditUserInfo extends Component {
  constructor() {
    super();
    this.state = {
      userID: "",
      user: [],
      userName: "",
      userEmail: "",
      userPhone: "",
      userPassword: "",
      imageURL: "",
      userPassword2: "",
      userErrors: "",
      userPasswordError: "",
      token: "",
      modal: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "UPDATE_FAIL") {
        this.setState({ userErrors: error.msg.msg });
      } else {
        this.setState({ userErrors: "" });
      }
    }
  }
  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    fetch(getUserInfoByTokenAPI, {
      headers: {
        "x-auth-token": this.props.auth.token
      }
    })
      .then(res => res.json())
      .then(user => this.setState({ user: user }));
  }
  handleEdit(id, name, email, phone, avatar) {
    this.setState({
      userID: id,
      userName: name,
      userEmail: email,
      userPhone: phone,
      imageURL: avatar
    });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        userEmailError: "",
        userPasswordError: "",
        userPhoneError: "",
        userDuplicateEmailError: ""
      });
      const existingUser = {
        name: this.state.userName,
        email: this.state.userEmail,
        phone: this.state.userPhone,
        avatar: this.state.imageURL,
        token: this.props.auth.token,
        id: this.state.userID
      };
      this.props.updateInfo(existingUser);
      Swal.fire({
        type: "success",
        title: "Success! Refresh to View",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  validate = () => {
    // let userPasswordError = "";

    // if (
    //   this.state.userPassword !== this.state.userPassword2 ||
    //   this.state.userPassword.length < 6 ||
    //   this.state.userPassword2 < 6
    // ) {
    //   userPasswordError =
    //     "Error! Passwords do not match or have less than 6 characters. Please try again! ";
    // }
    // if (userPasswordError) {
    //   this.setState({ userPasswordError });
    //   return false;
    // }
    return true;
  };

  render() {
    return (
      <LoginWrapper>
        <Button
          className="mb-3 add-new-button"
          outline
          color="success"
          onClick={this.handleEdit.bind(
            this,
            this.state.user._id,
            this.state.user.name,
            this.state.user.email,
            this.state.user.phone,
            this.state.user.avatar
          )}
          data-toggle="collapse"
          data-target="#demo"
        >
          EDIT PROFILE
        </Button>
        <div id="demo" class="collapse">
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Input
                type="name"
                name="userName"
                value={this.state.userName}
                onChange={this.onChange}
                className="mb-3 mt-2"
                placeholder="Name*"
                required
              />
              <Input
                type="email"
                id="userEmail"
                name="userEmail"
                onChange={this.onChange}
                value={this.state.userEmail}
                className="mb-3"
                placeholder="Email*"
                required
              />
              <Input
                type="phone"
                id="userPhone"
                name="userPhone"
                value={this.state.userPhone}
                onChange={this.onChange}
                className="mb-3"
                placeholder="Phone #*"
                required
              />
              <Input
                type="url"
                name="imageURL"
                onChange={this.onChange}
                className="mb-3"
                value={this.state.imageURL}
                placeholder="Avatar Link"
              />
              {/* <Input
                type="password"
                id="userPassword"
                name="userPassword"
                value={this.state.user.password}
                onChange={this.onChange}
                className="mb-3"
                placeholder="Password*"
                required
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.userPasswordError}
              </div>
              
              <Input
                type="password"
                id="userPassword2"
                className="mb-3"
                name="userPassword2"
                value={this.state.user.password}
                onChange={this.onChange}
                placeholder="Retype Password*"
                required
              /> */}
              <div className="text-muted mb-2 text-left">* Required fields</div>
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.userPasswordError}
              </div>
              {this.state.userErrors ? (
                <Alert> {this.state.userErrors}</Alert>
              ) : null}
              <Button color="primary" block>
                SUBMIT
              </Button>
            </FormGroup>
          </Form>
        </div>
      </LoginWrapper>
    );
  }
}
const LoginWrapper = styled.div`
  .btn-link:hover {
    transform: scale(1.1);
  }
  .modal-header {
    margin-top: -1rem;
  }
  .register:hover {
    transform: scale(1.05);
  }
  .register {
    display: inline-block;
    background-color: #df2b2b;
  }
  .top-icon i:hover {
    transform: scale(1.1);
  }
  .boxed {
    border-radius: 2rem;
    background: rgb(249, 56, 56, 0.7);
    margin-bottom: 1rem;
  }
  .top-icon i {
    color: #f93838 !important;
    font-size: 25px;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .card-signin {
    border: 0;
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
    letter-spacing: 0.1rem;
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
  .btn-danger {
    background: #f93838 !important;
  }
`;
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { updateInfo, clearErrors }
)(EditUserInfo);
