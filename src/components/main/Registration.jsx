import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {register} from '../../actions/authActions'

class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      userEmail: '',
      userPhone: '',
      userPassword: '',
      userPassword2:'',
      userErrors:'',
      userPasswordError:'',
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidUpdate(prevProps) {
    const {error} = this.props
    if (error !== prevProps.error){
      if(error.id ==='REGISTER_FAIL'){
        this.setState({ userErrors: error.msg.msg})
      }else{
        this.setState({ userErrors:''})
      }
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e){
    e.preventDefault()
    const isValid = this.validate()
    if(isValid){
      this.setState({
        userEmailError: '',
        userPasswordError: '',
        userPhoneError: '',
        userDuplicateEmailError:'',
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

    if (this.state.userPassword !== this.state.userPassword2 || this.state.userPassword.length <6 || this.state.userPassword2 <6) {
      userPasswordError = 'Error! Passwords do not match or have less than 6 characters. Please try again! '
    }
    if (userPasswordError){
      
      this.setState({ userPasswordError})
      return false;
    }
    return true;
  }

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
              
                {this.state.userErrors ? (
                  <div className='boxed text-center'> {this.state.userErrors}</div>
                ):null}
                <form onSubmit={this.onSubmit} className="form-signin">
                  <div className="form-label-group">
                    <input
                      type="name"
                      id="inputName"
                      name="userName"
                      onChange={this.onChange}
                      className="form-control"
                      placeholder="Name*"
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      name="userEmail"
                      onChange={this.onChange}
                      className="form-control"
                      placeholder="Email address*"
                      required
                    />
                  </div>
                  <div className="form-label-group">
                    <input
                      type="phone"
                      id="inputPhone"
                      name="userPhone"
                      onChange={this.onChange}
                      className="form-control"
                      placeholder="Phone #"
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      name="userPassword"
                      onChange={this.onChange}
                      className="form-control"
                      placeholder="Password*"
                      required
                    />
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.userPasswordError}
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputRetypePassword"
                      className="form-control"
                      name = "userPassword2"
                      onChange={this.onChange}
                      placeholder="Retype Password*"
                      required
                    />
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.userPasswordError}
                  </div>
                  <div style={{ fontSize: 12}} className="mb-2 text-muted">
                    * Required fields
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
.boxed {
  border-radius:2rem;
  background:rgb(249,56,56,0.7);
  margin-bottom: 1rem;
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
}

`;
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})
export default connect(mapStateToProps,{register})(Registration)