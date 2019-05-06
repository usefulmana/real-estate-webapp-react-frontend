import React, { Component } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { clearErrors } from '../../actions/errorActions'
import {createProperty} from '../../actions/propertyActions'
import Swal from 'sweetalert2'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Alert
} from 'reactstrap';

class PropertyForm extends Component {

  constructor(props){
    super(props)
    this.state ={
      modal : false,
      propertyTitle: '',
      propertyPrice:'',
      propertyArea:'',
      bedroom:'',
      bathroom:'',
      direction:'',
      address:'',
      city:'',
      province:'',
      imageURLs:[],
      project:'',
      user:''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount() {
    fetch('http://localhost:3000/auth/user', {
      headers: {
        'x-auth-token': `${this.props.auth.token}`
      }
    }).then(res => res.json()).then(json => this.setState({ user: json._id }));
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };
  onSubmit(e) {
    e.preventDefault()
    // const isValid = this.validate()
      const property = {
        title: this.state.propertyTitle,
        price: this.state.propertyPrice,
        area: this.state.propertyArea,
        totalArea: this.state.projectArea,
        numOfBedrooms: this.state.bedroom,
        numOfBathrooms: this.state.bathroom,
        direction: this.state.direction,
        address: this.state.address,
        city: this.state.city,
        province: this.state.province,
        project: this.state.project,
        user: this.state.user
      }
    this.props.createProperty(property, this.props.auth.token)
      Swal.fire({
        type: "success",
        title: "Success!",
        showConfirmButton: false,
        timer: 500
      });
      setTimeout(window.location.reload(), 5000)
    
  }

  // validate = () => {
  //   let projectAreaError = ''

  //   if (!this.state.projectArea || this.state.projectArea <= 0) {
  //     projectAreaError = 'This field cannot be blank. Total area cannot be negative or equal to 0!'
  //   }
  //   if (projectAreaError) {
  //     this.setState({ projectAreaError })
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    return (
      <NewPropertyFormWrapper>
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-4 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <div className="text-center top-icon">
                  <Link to="/">
                    <i className="navbar-brand fas fa-home"> HOMELY</i>
                  </Link>
                </div>
                <h5 className="card-title text-center">New Property</h5>
                <form action="#" className="form-signin">
                  <div className="form-label-group">
                    <input
                      type="title"
                      id="inputTitle"
                      className="form-control"
                      placeholder="Post Title"
                      required
                      autoFocus
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

                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Submit
                  </button>
                  <hr class="my-4" />
                  <p className="text-center">Have not registered yet?</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </NewPropertyFormWrapper>
    )
  }
}

const NewPropertyFormWrapper = styled.div`
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
  }
`
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { createProperty, clearErrors })(PropertyForm)