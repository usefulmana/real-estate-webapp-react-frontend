import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input
} from "reactstrap";

export default class SearchModal extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      query: ""
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  toggle = () => {
    // Clear errors
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    return (
      <SearchModalWrapper>
        <div>
          <Button
            className="mb-3 add-new-button"
            outline
            color="red"
            onClick={this.toggle}
          >
            Search Properties
          </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle} className="mx-auto">
              Search Properties
            </ModalHeader>
            <ModalBody>
              <div className="text-center top-icon mb-3">
                <Link to="/">
                  <i className="navbar-brand fas fa-home"> HOMELY</i>
                </Link>
              </div>
              <Form className="form-signin">
                <FormGroup>
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Address, City, Province"
                    name="query"
                    id="search"
                    onChange={this.onChange}
                  />
                  <Link
                    to={{
                      pathname: `/results/${this.state.query}`,
                      state: "flushDeal"
                    }}
                  >
                    <span className="input-group-append">
                      <button
                        class="btn btn-search my-2 my-sm-0 "
                        type="submit"
                      >
                        <i class="fa fa-search" />
                      </button>
                    </span>
                  </Link>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </SearchModalWrapper>
    );
  }
}

const SearchModalWrapper = styled.div`
  .form-signin input {
    border: none;
    max-height: 32px;
    height: auto;
    border-radius: 2rem;
  }
`;
