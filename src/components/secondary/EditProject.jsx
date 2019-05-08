import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
import { updateProject } from '../../actions/projectActions'
import { clearErrors } from '../../actions/errorActions'
import { connect } from 'react-redux'
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

class EditProject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            project: [],
            projectID: '',
            projectName: '',
            projectOwner: '',
            projectArea: '',
            projectType: '',
            projectStartYear: '',
            projectEndYear: '',
            projectAreaError: '',
            user: '',
            msg: null
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    // componentDidMount() {
    //     fetch(`http://localhost:3000/project/byId/${this.props.projectID}`, {
    //         headers: {
    //             'x-auth-token': `${this.props.auth.token}`
    //         }
    //     }).then(res => res.json()).then(json => this.setState({ project : json}));
    // }
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
        const isValid = this.validate()

        if (isValid) {
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
                token: this.props.auth.token,
                id: this.state.projectID
            }
            this.props.updateProject(project)
            Swal.fire({
                type: "success",
                title: "Success! Refresh to View",
                showConfirmButton: false,
                timer: 2000
            });
            setTimeout(this.toggle, 3000)
        }
    }
    handleEdit(id, name,
        owner,
        type,
        totalArea,
        startYear,
        endYear,) {
        this.setState({
            projectID: id,
            projectOwner: owner,
            projectName: name,
            projectType: type,
            projectArea: totalArea,
            projectStartYear: startYear,
            projectEndYear: endYear
        })
        this.toggle();
    }
    validate = () => {
        let projectAreaError = ''

        if (!this.state.projectArea || this.state.projectArea <= 0) {
            projectAreaError = 'This field cannot be blank. Total area cannot be negative or equal to 0!'
        }
        if (projectAreaError) {
            this.setState({ projectAreaError })
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

        const yearListPast = pastYears.map((x) => { return (<option key={x} value={x}>{x}</option>) });
        const yearListFuture = futureYears.map((x) => { return (<option key={x} value={x}>{x}</option>) });
        return (
            <NewProjectFormWrapper>
                <Button outline color='success' 
                    onClick={this.handleEdit.bind(this, this.props.project._id, this.props.project.name, this.props.project.owner, this.props.project.type, this.props.project.totalArea, this.props.project.startYear, this.props.project.endYear)} 
                outline color="primary" size='sm' data-toggle="tooltip" title="Edit"><i class="far fa-edit"></i></Button>
                <Modal isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle} className="mx-auto">
                        PROJECT FORM
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
                                    type="name"
                                    id="inputName"
                                    name="projectName"
                                    className=" mb-3 mt-2"
                                    value={this.state.projectName}
                                    placeholder="Project Name"
                                    onChange={this.onChange}
                                    required
                                    autoFocus
                                />
                                <Input
                                    type="owner"
                                    id="inputOwner"
                                    name="projectOwner"
                                    className="mb-3"
                                    placeholder="Project Owner"
                                    value={this.state.projectOwner}
                                    onChange={this.onChange}
                                    required
                                />
                                <Input
                                    type="number"
                                    id="inputArea"
                                    name="projectArea"
                                    className="mb-3"
                                    min="1"
                                    placeholder="Total Area in square meter"
                                    value={this.state.projectArea}
                                    onChange={this.onChange}
                                    required
                                />

                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.projectAreaError}
                                </div>

                                <Input
                                    type="select"
                                    id="inputType"
                                    name="projectType"
                                    className="custom-select mb-3"
                                    placeholder="Project Type"
                                    value={this.state.projectType}
                                    onChange={this.onChange}
                                    required
                                >
                                    <option value="" selected disabled>Project Type</option>
                                    <option value="House">House</option>
                                    <option value="Land">Land</option>
                                    <option value="Apartment">Apartment</option>
                                </Input>
                                <Input
                                    type="select"
                                    id="inputType"
                                    name="projectStartYear"
                                    className="custom-select mb-3"
                                    placeholder="Project Type"
                                    value={this.state.startYear}
                                    onChange={this.onChange}
                                    required
                                >
                                    <option value="" selected disabled>Start Year</option>
                                    {yearListPast}
                                </Input>
                                <Input
                                    type="select"
                                    id="inputType"
                                    name="projectEndYear"
                                    className="custom-select mb-3"
                                    placeholder="Project Type"
                                    value ={this.state.endYear}
                                    onChange={this.onChange}
                                    required
                                >
                                    <option value="" selected disabled>End Year</option>
                                    {yearListFuture}
                                </Input>
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
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { updateProject, clearErrors })(EditProject)