import React, { Component } from 'react'
import styled from 'styled-components'
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap'
import {Link} from 'react-router-dom'
import { getAllPropertiesAPI } from '../../data/apiroutes';

export default class ProjectDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      modal: false,
      properties:[]
    }
  }
  toggle = () => {
    
    this.setState({
      modal: !this.state.modal
    });
  };
  componentDidMount() {
    this.fetchProjects(this.props.project._id)
  }
  fetchProjects(id ){
    fetch(getAllPropertiesAPI)
      .then(res => res.json())
      .then(properties => properties.filter(p => p.project === id))
    .then(p => this.setState({
      properties: p
    }));
  }
  render() {

    return (
      <ProjectDetailWrapper>
        <Button
          outline
          color="info"
          size="sm"
          data-toggle="tooltip"
          onClick = {this.toggle}
          title="View all properties belong to this project"
        >
          <i class="fas fa-info-circle" />
        </Button>{" "}
      <Modal isOpen={this.state.modal} toggle={this.toggle} size='xl'>
          <ModalHeader toggle={this.toggle} className="mx-auto">
            Project {this.props.project.name}
          </ModalHeader>
          <ModalBody>
            <div className="row">
              {this.state.properties.map(p =>
                <div className="col-4">
                  <Link
                    to={`/propertyDetails/${p._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div class="card text-dark property-card">
                      {p.imageURL.length === 0 ? <img class="card-img-top img-grid"  width="300px"  height="200px" src='http://www.cbkhardware.com/pub/media/catalog/product/placeholder/default/noimage-1.png' alt="Card image cap" />
                        : <img class="card-img-top img-grid" src={p.imageURL[0]} alt="Card image cap" width="300px" height="200px"/>}
                      <div class="card-body">
                        <h5 class="card-title">{p.title}</h5>
                        <p class="card-text">${p.price}</p>
                        <hr />
                        <div className="row text-muted icon ml-2 mb-3">
                          <span className="fas fa-bed" title="Bedrooms">
                            {" "}
                            {!p.numOfBedrooms ? "Not Avail." : p.numOfBedrooms}
                          </span>
                          <span className="fas fa-shower" title="Bathrooms">
                            {" "}
                            {!p.numOfBathrooms ? "Not Avail." : p.numOfBathrooms}
                          </span>
                          <span className="fas fa-ruler-combined" title="Area">
                            {" "}
                            {p.area}
                          </span>
                        </div>
                        <p className="text-muted text-left address">{p.address}</p>
                      </div>
                    </div>
                  </Link>
                  <br />
                  <br />
                </div>
            )}
              
            </div>
          </ModalBody>
      </Modal>
      </ProjectDetailWrapper>
    )
  }
}
 const ProjectDetailWrapper =  styled.div`
 .vl {
 margin-right:1rem;
  border-left: 1px solid #6C757D;
  height: 2.5rem;
}
  .property-card{
    width: 340px;
    max-height: 360px;
  }
  .card:hover {
    transform: scale(1.05);
  }

.icon span{
  margin-right: 0.5rem;
}
.icon{
  margin-bottom: 1rem;
}
 `