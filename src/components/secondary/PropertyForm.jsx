import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { clearErrors } from '../../actions/errorActions'
import { createProperty } from '../../actions/propertyActions'
import { getProjects } from '../../actions/projectActions';
import Swal from 'sweetalert2'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Alert,
  Row,
  Col
} from 'reactstrap';

class PropertyForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      propertyTitle: '',
      propertyPrice: '',
      propertyArea: '',
      bedroom: '',
      bathroom: '',
      direction: '',
      address: '',
      city: '',
      province: '',
      imageURLs: [],
      project:'',
      user: ''
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
    var property = {
      title: this.state.propertyTitle,
      price: this.state.propertyPrice,
      area: this.state.propertyArea,
      numOfBedrooms: this.state.bedroom,
      numOfBathrooms: this.state.bathroom,
      direction: this.state.direction,
      address: this.state.address,
      city: this.state.city,
      province: this.state.province,
      user: this.state.user
    }
    
    if (this.state.project){
      console.log(this.state.project)
      property.project = this.state.project
      this.props.createProperty(property, this.props.auth.token)
      this.setState({project:''})
      Swal.fire({
        type: "success",
        title: "Success!",
        showConfirmButton: false,
        timer: 500
      });
      setTimeout(window.location.reload(), 5000)
    }
    else {
      this.props.createProperty(property, this.props.auth.token)
      Swal.fire({
        type: "success",
        title: "Success!",
        showConfirmButton: false,
        timer: 500
      });
      setTimeout(window.location.reload(), 5000)
    }
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
    const directions = ['North', 'East', 'South', 'West', 'Northwest', 'Northeast', 'Southwest','Southeast']
    const directionChoices = directions.map(d => { return (<option value={d}>{d}</option>)})
    const projects = this.props.projects.map(p => { return (<option value={p._id}>{p.name}</option>)})
    return (
      <NewPropertyFormWrapper>
        <Button className="mb-3 add-new-button" outline color='success' onClick={this.toggle}>ADD NEW PROPERTY</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="mx-auto">
            PROPERTY FORM
          </ModalHeader>
          <ModalBody>
            <div className="text-center top-icon">
              <Link to="/">
                <i className="navbar-brand fas fa-home"> HOMELY</i>
              </Link>
            </div>
            {this.state.msg ? (
              <Alert> {this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit} className="form-signin">
              <FormGroup>
                <Input
                  type="title"
                  id="inputTitle"
                  className=" mb-3 mt-2"
                  placeholder="Post Title"
                  name = "propertyTitle"
                  onChange={this.onChange}
                  required
                  autoFocus
                />
                <Input
                  type="title"
                  id="inputTitle"
                  className=" mb-3 mt-2"
                  placeholder="Street Address"
                  name="address"
                  onChange={this.onChange}
                  required
                />
                <Row form>
                  <Col md={6}>
                    <Input
                      type="text"
                      name="city"
                      className="mb-3 w-10"
                      min='0'
                      placeholder="City / Town"
                      onChange={this.onChange}
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      type="text"
                      name="province"
                      className="mb-3 w-10"
                      onChange={this.onChange}
                      placeholder="Province"
                    />
                  </Col>
                </Row>
                <Input
                  type="select"
                  name="project"
                  className="custom-select mb-3"
                  onChange={this.onChange}
                >
                  <option value='' selected>Project</option>
                  {projects}
                </Input>
                <Row form>
                  <Col md={4}>
                    <Input
                      type="number"
                      name="propertyPrice"
                      className="mb-3 w-10"
                      min='0'
                      placeholder="Price in USD"
                      onChange={this.onChange}
                      required
                    />
                  </Col>
                  <Col md={4}>
                    <Input
                      type="number"
                      name="bedroom"
                      className="mb-3 w-10"
                      onChange={this.onChange}
                      min='0'
                      placeholder="Bedrooms"
                    />
                  </Col>
                  <Col md={4}>
                    <Input
                      type="number"
                      name="bathroom"
                      className="mb-3 w-10"
                      onChange={this.onChange}
                      min='0'
                      placeholder="Bathrooms"
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <Input
                      type="number"
                      name="propertyArea"
                      className="mb-3 w-10"
                      onChange={this.onChange}
                      min='0'
                      placeholder="Property Area"
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      type="select"
                      name="direction"
                      className="custom-select mb-3"
                      onChange={this.onChange}
                      required
                    >
                      <option value='' selected disabled>Property Direction</option>
                      {directionChoices}
                    </Input>
                  </Col>
                </Row>
                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Submit
                  </button>
              </FormGroup>         
            </Form>
          </ModalBody>
        </Modal>
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
  auth: state.auth,
  projects: state.projects.items
})
export default connect(mapStateToProps, { createProperty, clearErrors, getProjects })(PropertyForm)