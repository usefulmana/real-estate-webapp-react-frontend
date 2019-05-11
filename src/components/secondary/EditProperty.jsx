import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { clearErrors } from '../../actions/errorActions'
import { updateProperty } from '../../actions/propertyActions'
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

class EditProperty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            propertyID:'',
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
            project: '',
            user: '',
            id:'',
            token:'',
            addImageError:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    // componentDidMount() {
    //     fetch('http://localhost:3000/auth/user', {
    //         headers: {
    //             'x-auth-token': `${this.props.auth.token}`
    //         }
    //     }).then(res => res.json()).then(json => this.setState({ user: json._id }));
    // }
    addImageUrlInput() {
        this.setState({ imageURLs: [...this.state.imageURLs, ''] })
    }
    handleImageUrlChange(e, index) {
        this.state.imageURLs[index] = e.target.value
        this.setState({ imageURLs: this.state.imageURLs })
    }
    handleRemove(index) {
        this.state.imageURLs.splice(index, 1)

        console.log(this.state.imageURLs)

        this.setState({
            imageURLs: this.state.imageURLs
        })
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
    handleEdit(id, title,
        price,
        area,
        bedroom,
        bathroom,
        direction,
        address,
        city,
        province,
        project,
        imageURLs
     ) {
        this.setState({
            propertyID: id,
            propertyTitle: title,
            propertyPrice: price,
            propertyArea:area,
            bedroom: bedroom,
            bathroom: bathroom,
            direction: direction,
            address: address,
            city: city,
            province: province,
            project:project,
            imageURLs : imageURLs,
            addImageError:''
        })
        this.toggle();
    }
    onSubmit(e) {
        e.preventDefault()
        const isValid = this.validate()
        if(isValid){

            var property = {
                title: this.state.propertyTitle.toUpperCase(),
                price: this.state.propertyPrice,
                area: this.state.propertyArea,
                numOfBedrooms: this.state.bedroom,
                numOfBathrooms: this.state.bathroom,
                direction: this.state.direction,
                address: this.state.address,
                city: this.state.city,
                province: this.state.province,
                token: this.props.auth.token,
                id: this.state.propertyID,
                imageURL: this.state.imageURLs
            }
            if (this.state.project) {
                property.project = this.state.project
                console.log(property)
                this.props.updateProperty(property)
                this.setState({ project: '' })
                Swal.fire({
                    type: "success",
                    title: "Success! Refresh to View",
                    showConfirmButton: false,
                    timer: 2000
                });
                setTimeout(this.toggle, 3000)
            }
            else {
                this.props.updateProperty(property, this.props.auth.token, this.props.property._id)
                Swal.fire({
                    type: "success",
                    title: "Success! Refresh to View",
                    showConfirmButton: false,
                    timer: 2000
                });
                setTimeout(this.toggle, 3000)
            }
        }
        
    }

    imageURLCheck = (elem) => {
        return elem.endsWith('.jpg') || elem.endsWith('.png')
    }
    validate = () => {
        let addImageError = ''
        let tempArray = ''
        tempArray = this.state.imageURLs.some(this.imageURLCheck)
        console.log(tempArray)
        if (!this.state.imageURLs.every(this.imageURLCheck)) {
            addImageError = "Links that end with .png or .jpg only"
        }
        if (addImageError) {
            this.setState({
                addImageError
            })
            return false;
        }
        return true;
    }
    render() {
        const directions = ['North', 'East', 'South', 'West', 'Northwest', 'Northeast', 'Southwest', 'Southeast']
        const directionChoices = directions.map(d => { return (<option value={d}>{d}</option>) })
        const projects = this.props.projects.map(p => { return (<option value={p._id}>{p.name}</option>) })
        return (
            <NewPropertyFormWrapper>
                <Button outline color='success'
                    onClick={this.handleEdit.bind(this, this.props.property._id, this.props.property.title, this.props.property.price, this.props.property.area, this.props.property.numOfBedrooms,
                        this.props.property.numOfBathrooms, this.props.property.direction, this.props.property.address, this.props.property.city, this.props.property.province, this.props.property.project, this.props.property.imageURL)}
                    outline color="primary" size='sm' data-toggle="tooltip" title="Edit"><i class="far fa-edit"></i></Button>
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
                                    name="propertyTitle"
                                    value = {this.state.propertyTitle}
                                    onChange={this.onChange}
                                    required
                                    autoFocus
                                />
                                <Input
                                    type="address"
                                    id="inputAddress"
                                    className=" mb-3 mt-2"
                                    placeholder="Street Address"
                                    name="address"
                                    value={this.state.address}
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
                                            value={this.state.city}
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
                                            value={this.state.province}
                                            placeholder="Province / State"
                                            required
                                        />
                                    </Col>
                                </Row>
                                <Input
                                    type="select"
                                    name="project"
                                    className="custom-select mb-3"
                                    value={this.state.project}
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
                                            value={this.state.propertyPrice}
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
                                            value={this.state.bedroom}
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
                                            value={this.state.bathroom}
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
                                            value={this.state.propertyArea}
                                            placeholder="Property Area"
                                            required
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Input
                                            type="select"
                                            name="direction"
                                            className="custom-select mb-3"
                                            value = {this.state.direction}
                                            onChange={this.onChange}
                                            required
                                        >
                                            <option value='' selected disabled>Property Direction</option>
                                            {directionChoices}
                                        </Input>
                                    </Col>
                                </Row>
                               
                                {this.state.imageURLs.map((imageURL, index) => {
                                    return (
                                        <Row className="button" form key={index}>
                                            <Col md={9}>
                                                <Input
                                                    type="url"
                                                    name={imageURL}
                                                    className=" mb-3"
                                                    placeholder="Image Link"
                                                    onChange={(e) => this.handleImageUrlChange(e, index)}
                                                    value={imageURL}
                                                />
                                            </Col>
                                            <Col md={3}>
                                                <Button
                                                    outline
                                                    color="danger"
                                                    size="sm"
                                                    title="Remove"
                                                    className="mt-1"
                                                    onClick={(index) => this.handleRemove(index)}
                                                >
                                                    <i class="fas fa-minus"></i>
                                                </Button>
                                            </Col>
                                        </Row>

                                    )
                                })}

                                <div className="ml-1 mb-1" style={{ fontSize: 12, color: "red" }}>{this.state.addImageError}</div>
                                <Button
                                    outline
                                    color="success"
                                    size="sm"
                                    title="Add More"
                                    className="mb-3"
                                    onClick={(e) => this.addImageUrlInput(e)}
                                >
                                    <i className="fas fa-plus"></i>{' '}Add Image
                            </Button>
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
export default connect(mapStateToProps, { updateProperty, clearErrors, getProjects })(EditProperty)