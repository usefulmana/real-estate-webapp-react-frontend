import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import NavBar from "../secondary/NavBar";
import Footer from "../secondary/Footer";
import { getPropertiesByAddress } from "../../actions/propertyActions";
import { withRouter, Link } from "react-router-dom";
import { Table,Button} from "reactstrap";


class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGrid: true,
      isList: false,
      minPrice: 0,
      maxPrice: 50000000,
      bedroom: 0,
      bathroom: 0,
      minArea: 0,
      maxArea: 5000,
      direction: '',
      table:''
    };
    this.onChange = this.onChange.bind(this);
    this.onClickGrid = this.onClickGrid.bind(this)
    this.onClickList= this.onClickList.bind(this)
  }
  
  componentDidMount() {
    this.props.getPropertiesByAddress(this.props.match.params.query);
  }

  componentWillMount(){
    this.setState({ filteredProperties: this.props.properties.items})
  }
  onClickGrid(){
      this.setState({
            isGrid:true,
            isList:false
      })
  }
  onClickList() {
    this.setState({
      isGrid: false,
      isList: true
    })
  }
  // filterProperty = () =>{
  //   let filteredProperties = this.props.properties.items
  //   filteredProperties = filteredProperties.filter(p=>{
  //      return (p.price <= this.state.maxPrice && p.price >= this.state.minPrice)
  //   })
  //   filteredProperties = filteredProperties.filter(p => {
  //     return (p.numOfBedrooms >= this.state.bedroom)
  //   })
  //   filteredProperties = filteredProperties.filter(p => {
  //     return (p.numOfBathrooms >= this.state.bathroom)
  //   })
  //   filteredProperties = filteredProperties.filter(p => {
  //     return (p.area <= this.state.maxArea && p.area >= this.state.minArea)
  //   })
  //   filteredProperties = filteredProperties.filter(p => {
  //     if(!this.state.direction){
  //       return filteredProperties
  //     }
  //     return (p.direction == this.state.direction)
  //   })
  //   this.setState({
  //     filteredProperties
  //   })
  // }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.forceUpdate()
   
  }
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.match.params.query !== nextProps.match.params.query) {
  //     this.props.getPropertiesByAddress(nextProps.match.params.id);
  //   }
  // }
  render() {
    if (!this.props.properties.items) {
      return null
    }
    const directions = [
      "North",
      "East",
      "South",
      "West",
      "Northwest",
      "Northeast",
      "Southwest",
      "Southeast"
    ];
    const directionChoices = directions.map(d => {
      return <option value={d}>{d}</option>;
    });
    var propertyItemsGrid = this.props.properties.items
    .filter(p => { return (p.price <= this.state.maxPrice && p.price >= this.state.minPrice)})
    .filter(p => {return (p.numOfBedrooms >= this.state.bedroom)})
      .filter(p => {
        return (p.numOfBathrooms >= this.state.bathroom)
      })
      .filter(p => {
        return (p.area <= this.state.maxArea && p.area >= this.state.minArea)
      }).filter(p => {
        if (!this.state.direction) {
          return p
        }
        return (p.direction == this.state.direction)
      })
    .map(p => {
      return (
        <Link to={`/propertyDetails/${p._id}`} style={{ textDecoration: 'none' }}>
          <div class="card text-dark property-card">
            <img class="card-img-top" src="..." alt="Card image cap" />
            <div class="card-body">
              <h5 class="card-title">{p.title}</h5>
              <p class="card-text">${p.price}</p>
              <hr />
              <div className='row text-muted text-left icon mt-1 mb-2' >
                <span className="fas fa-bed" title="Bedrooms">
                  {' '}{!p.numOfBedrooms ? 'Not Avail.' : p.numOfBedrooms}
                </span>
                <span className="fas fa-shower" title="Bathrooms">
                  {' '}{!p.numOfBathrooms ? 'Not Avail.' : p.numOfBathrooms}
                </span>
                <span className="fas fa-ruler-combined" title="Area">
                  {' '}{p.area}
                </span>
              </div>
              <p className="text-muted text-left address">{p.address}</p>

            </div>
          </div>
        </Link>)
    })

    var propertyItemsList = this.props.properties.items
      .filter(p => { return (p.price <= this.state.maxPrice && p.price >= this.state.minPrice) })
      .filter(p => { return (p.numOfBedrooms >= this.state.bedroom) })
      .filter(p => {
        return (p.numOfBathrooms >= this.state.bathroom)
      })
      .filter(p => {
        return (p.area <= this.state.maxArea && p.area >= this.state.minArea)
      }).filter(p => {
        if (!this.state.direction) {
          return p
        }
        return (p.direction == this.state.direction)
      })
      .map(p => {
        return (
          // <Link to={`/propertyDetails/${p._id}`} style={{ textDecoration: 'none' }} className='text-muted'>
                <tr>
            <td>{p.address}</td>
            <td>{p.city}</td>
            <td>{p.province}</td>
            <td>{p.price}</td>
            <td>{p.area}</td>
            <td>{p.numOfBedrooms}</td>
            <td>{p.numOfBathrooms}</td>
            <td>{p.direction}</td>
            <td>
              <Link to={`/propertyDetails/${p._id}`}>
                {" "}
                <Button
                  outline
                  color="info"
                  size="sm"
                  data-toggle="tooltip"
                  title="Details"
                >
                  <i class="fas fa-info-circle" />
                </Button>{" "}
                {"     "}
              </Link>
            </td>
                </tr>
                  
              
          // </Link>
          )
      })
      var tableHead = () => {
        return(
          <div>
            <Table className='text-center table-responsive table-hover '>
              <caption>{`List of Properties matching your query: ${this.props.match.params.query}`}</caption>
              <thead className="thead-light">
                <tr>
                  <th>Address</th>
                  <th>City / Town</th>
                  <th>Province / State</th>
                  <th>Price</th>
                  <th>Area</th>
                  <th>Bedrooms</th>
                  <th>Bathrooms</th>
                  <th>Direction</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {propertyItemsList}</tbody>
            </Table>
          </div>
      )
    }


    return (
      <SearchResultsWrapper>
        <div><NavBar /></div>
        <div className="views bg-light">
          <div className="row">
            <button className={this.state.isGrid ? "btn btn-light active" : "btn btn-light "} title="Grid View" onClick={this.onClickGrid}><i class="fas fa-th"></i></button>
            <button className={this.state.isList ? "btn btn-light active" : "btn btn-light"} title="List View" onClick={this.onClickList}><i class="fas fa-list"></i></button>
          </div>
        </div>
        <div className="row margin">
          <div className="col-3">
            <div class="card">
              <article class="card-group-item">
                <header class="card-header">
                  <h6 class="title">Price Range </h6>
                </header>
                <div class="filter-content">
                  <div class="card-body">
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label>Min</label>
                        <input type="number" class="form-control" name="minPrice" placeholder="$0" min='0' max='50000000' onChange={this.onChange}/>
                      </div>
                      <div class="form-group col-md-6 text-right">
                        <label>Max</label>
                        <input type="number" class="form-control" name="maxPrice" placeholder="$50,000,000" min='0' max='50000000' onChange={this.onChange}/>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              <article class="card-group-item">
                <header class="card-header">
                  <h6 class="title">Amenities</h6>
                </header>
                <div class="filter-content">
                  <div class="card-body">
                    <label class="my-1 mr-2" for="bedroom-select">Bedrooms</label>
                    <select class="custom-select my-1 mr-sm-2" id="bedroom-select" name="bedroom" onChange={this.onChange}>
                      <option selected value="0">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>

                    <label class="my-1 mr-2" for="bathroom-select">Bathrooms</label>
                    <select class="custom-select my-1 mr-sm-2" id="bathroom-select" name="bathroom" onChange={this.onChange}>
                      <option selected value="0">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                </div>
              </article>
              <article class="card-group-item">
                <header class="card-header">
                  <h6 class="title">Area</h6>
                </header>
                <div class="filter-content">
                  <div class="card-body">
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label>Min</label>
                        <input type="number" class="form-control" name='minArea' placeholder="0" min='0' max='5000' onChange={this.onChange} />
                      </div>
                      <div class="form-group col-md-6 text-right">
                        <label>Max</label>
                        <input type="number" class="form-control" placeholder="5,000" name='maxArea' min='0' max='5000' onChange={this.onChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              <article class="card-group-item">
                <header class="card-header">
                  <h6 class="title">Properties</h6>
                </header>
                <div class="filter-content">
                  <div class="card-body">
                    <label class="my-1 mr-2" for="bedroom-select">Direction</label>
                    <select class="custom-select my-1 mr-sm-2" name="direction" id="bedroom-select" onChange={this.onChange}>
                      <option selected value="">Any</option>
                      {directionChoices}
                    </select>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div className="col-9 d-flex align-items-stretch"> {this.state.isGrid ? propertyItemsGrid : tableHead()}</div>
        </div>
        <Footer />
      </SearchResultsWrapper>
    );
  }
}

const SearchResultsWrapper = styled.div`

.views{
  margin-top: 3.8rem;
  padding: 1rem;
}
.views .row{
  margin-left: 10rem;
}

.filter{
  margin-top: 3.5rem;
}
.icon{
  margin-top:-1rem;
}
.address{
  margin-bottom: -0.7rem;
}
.fas{
  margin-left:1rem;
  margin-right: 1rem;
}
.card{
  min-width: 20rem;
  margin-right:2rem;
}
.property-card:hover{
  transform: scale(1.05)
}
.margin{
  margin-top: 4rem;
  margin-bottom: 12rem;
  margin-left:10rem;
  margin-right: 10rem;
}
`;
const mapStateToProps = state => ({
  properties: state.properties
});
export default withRouter(connect(
  mapStateToProps,
  { getPropertiesByAddress }
)(SearchResults));
