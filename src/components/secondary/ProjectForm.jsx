import React, { Component } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Swal from "sweetalert2";
import {createProject} from '../../actions/projectActions'
import {connect} from 'react-redux'
import store from '../../store'
import NavBar from './NavBar';
class NewProjectForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      projectName:'',
      projectOwner:'',
      projectArea:'',
      projectType:'',
      projectStartYear:'',
      projectEndYear:'',
      projectAreaError:'',
      user:''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount() {
    const reduxState = store.getState();
    const authToken = reduxState.auth.token;
    fetch('http://localhost:3000/auth/user', {
      headers: {
        'x-auth-token': `${authToken}`
      }
    }).then(res => res.json()).then(json => this.setState({ user: json._id }));
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e){
    e.preventDefault()
    const isValid = this.validate()

    if(isValid){
      console.log("Valid!")
      this.setState({
        projectAreaError: ''
      })

      const project = {
        name: this.state.projectName,
        owner: this.state.projectOwner,
        type: this.state.projectType,
        totalArea: this.state.projectArea,
        startYear: this.state.projectStartYear,
        endYear: this.state.projectEndYear,
        user: this.state.user
      }
      this.props.createProject(project)
      Swal.fire({
        type: "success",
        title: "Success!",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  validate = () => {
    let projectAreaError = ''

    if(!this.state.projectArea || this.state.projectArea <=0){
      projectAreaError = 'This field cannot be blank. Total area cannot be negative or equal to 0!'
    }
    if (projectAreaError){
      this.setState({projectAreaError})
      return false;
    }
    return true;
  }

  render() {
    let minOffset = 0, maxOffset = 50;
    let thisYear = (new Date()).getFullYear();
    let pastYears = [];
    let futureYears = [];
    for (let x = 0; x <= maxOffset; x++) {
      pastYears.push(thisYear - x)
    }

    for (let x = 0; x <= maxOffset; x++) {
      futureYears.push(thisYear + x)
    }

    const yearListPast = pastYears.map((x) => { return (<option key={x}>{x}</option>) });
    const yearListFuture = futureYears.map((x) => { return (<option key={x}>{x}</option>) });
    return (
      <NewProjectFormWrapper>
      <NavBar/>
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-4 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <div className="text-center top-icon">
                  <Link to="/">
                    <i className="navbar-brand fas fa-home"> HOMELY</i>
                  </Link>
                </div>
                <h5 className="card-title text-center">New Project</h5>
                <form onSubmit={this.onSubmit} className="form-signin">
                  <div className="form-label-group">
                    <input
                      type="name"
                      id="inputName"
                      name="projectName"
                      className="form-control"
                      placeholder="Project Name"
                      onChange={this.onChange}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="owner"
                      id="inputOwner"
                      name="projectOwner"
                      className="form-control"
                      placeholder="Project Owner"
                      onChange={this.onChange}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      id="inputArea"
                      name="projectArea"
                      className="form-control"
                      placeholder="Total Area in square meter"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.projectAreaError}
                  </div>

                  <div className="form-label-group">
                    <select
                      id="inputType"
                      name="projectType"
                      className="form-control my-select custom-select"
                      placeholder="Project Type"
                      onChange={this.onChange}
                      required
                    >
                    <option value="" selected disabled>Project Type</option>
                    <option value="House">House</option>
                    <option value="Land">Land</option>
                    <option value="Apartment">Apartment</option>
                    </select>
                  </div>

                  <div className="form-label-group">
                    <select
                      id="inputType"
                      name="projectStartYear"
                      className="form-control my-select custom-select"
                      placeholder="Project Type"
                      onChange={this.onChange}
                      required
                    >
                      <option value="" selected disabled>Start Year</option>
                      {yearListPast}
                    </select>
                  </div>

                  <div className="form-label-group">
                    <select
                      id="inputType"
                      name="projectEndYear"
                      className="form-control my-select custom-select"
                      placeholder="Project Type"
                      onChange={this.onChange}
                      required
                    >
                      <option value="" selected disabled>End Year</option>
                      {yearListFuture}
                    </select>
                  </div>

                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </NewProjectFormWrapper>
    )
  }
}
const NewProjectFormWrapper = styled.div`
.my-select {
    border-radius: 2rem;
    height: auto;
  }
 .top-icon i{
    color: #f93838 !important;
    font-size: 25px;
    margin-bottom: 1rem;
  }
  .top-icon i:hover{
    transform:scale(1.1)
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
  } `

  export default connect(null, {createProject})(NewProjectForm)