import React, { Component } from "react";
import styled from "styled-components";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions';
class Registration extends Component {
  constructor(){
    super()
    this.state = {
      userName: '',
      userEmail: '',
      userPhone: '',
      userPassword: '',
      userPassword2: '',
      userErrors: '',
      userPasswordError: '',
      modal: false
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }


  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props
    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ userErrors: error.msg.msg })
      } else {
        this.setState({ userErrors: '' })
      }
    }
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault()
    const isValid = this.validate()
    if (isValid) {
      this.setState({
        userEmailError: '',
        userPasswordError: '',
        userPhoneError: '',
        userDuplicateEmailError: '',
      })
      const newUser = {
        name: this.state.userName,
        email: this.state.userEmail,
        password: this.state.userPassword,
        phone: this.state.userPhone
      }
      this.props.register(newUser)
    }
  }

  validate = () => {

    let userPasswordError = ''

    if (this.state.userPassword !== this.state.userPassword2 || this.state.userPassword.length < 6 || this.state.userPassword2 < 6) {
      userPasswordError = 'Error! Passwords do not match or have less than 6 characters. Please try again! '
    }
    if (userPasswordError) {

      this.setState({ userPasswordError })
      return false;
    }
    return true;
  }

  render() {
    return (
      <LoginWrapper>
        <Button outline color='danger' className="btn-link" onClick={this.toggle}>
          <strong>REGISTER</strong>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="mx-auto">
            <h4 className="mx-auto">Register</h4>
          </ModalHeader>
          <ModalBody>
            <div className="text-center top-icon">
              <Link to="/">
                <i className="navbar-brand fas fa-home"> HOMELY</i>
              </Link>
            </div>
            {this.state.userErrors ? (
              <Alert> {this.state.userErrors}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type="name"
                  id="userName"
                  name="userName"
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
                  className="mb-3"
                  placeholder="Email address*"
                  required
                />

                <Input
                  type="phone"
                  id="userPhone"
                  name="userPhone"
                  onChange={this.onChange}
                  className="mb-3"
                  placeholder="Phone #*"
                />

                <Input
                  type="password"
                  id="userPassword"
                  name="userPassword"
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
                  onChange={this.onChange}
                  placeholder="Retype Password*"
                  required
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.userPasswordError}
                </div>
                <div style={{ fontSize: 12 }} className="mb-2 text-muted">
                  * Required fields
                  </div>
                <Button
                  color="primary"
                  block
                >
                  Sign up
                  </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </LoginWrapper>
    );
  }
}
const LoginWrapper = styled.div`
.btn-link:hover{
  transform: scale(1.1)
}
.modal-header{
  margin-top: -1rem;
}
.register:hover {
    transform: scale(1.05);
  }
  .register {
    display: inline-block;
    background-color: #df2b2b;
  }
.top-icon i:hover{
    transform:scale(1.1)
  }
.boxed {
  border-radius:2rem;
  background:rgb(249,56,56,0.7);
  margin-bottom: 1rem;
} 
.top-icon i{
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
}

`;
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})
export default connect(mapStateToProps, { register, clearErrors })(Registration)