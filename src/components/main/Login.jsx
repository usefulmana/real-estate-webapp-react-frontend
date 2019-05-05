import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions';

class Login extends Component {
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
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
  };


  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    // Attempt to login
    this.props.login(user);
  };
  render() {
    return (
      <LoginWrapper>
        <NavLink className="btn btn-link" onClick={this.toggle}>
          LOG IN
        </NavLink>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle} className="mx-auto">
            SIGN IN
              </ModalHeader>
          <ModalBody>
            <div className="text-center top-icon">
              <Link to="/">
                <i className="navbar-brand fas fa-home"> HOMELY</i>
              </Link>
            </div>
            {this.state.msg? (
              <Alert> {this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type="email"
                  id="inputEmail"
                  className="mb-3 mt-2"
                  placeholder="Email address"
                  name='email'
                  required
                  onChange={this.onChange}
                />
                <Input
                  type="password"
                  id="inputPassword"
                  name='password'
                  className="mb-3"
                  placeholder="Password"
                  onChange={this.onChange}
                />
                <Button
                  color="primary"
                  block
                >
                  Sign in
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
.btn-lg{
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.btn-link{
  display: inline-block
}
.btn-link:hover{
  transform: scale(1.1)
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
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(Login);