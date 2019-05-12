import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import NavBar from "../secondary/NavBar";
import Footer from "../secondary/Footer";
import { getPropertiesByAddress } from "../../actions/propertyActions";
import { withRouter, Link } from "react-router-dom";
import ScrollUp from "../secondary/ScrollUp";
class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGrid:true,
      isList: false,
      minPrice: 0,
      maxPrice: 50000000,
      bedroom: 0,
      bathroom: 0,
      minArea: 0,
      maxArea: 5000,
      direction: "",
      table: "",
      filterOn: false,
      currentPage: 1,
      itemsPerPage: 6
    };
    this.onChange = this.onChange.bind(this);
    this.onClickGrid = this.onClickGrid.bind(this);
    this.onClickList = this.onClickList.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.onClickPageNumber = this.onClickPageNumber.bind(this)
  }
onClickPageNumber(e){
  this.setState({
    currentPage : Number(e.target.id)
  })
}
  toggleFilter() {
    this.setState({
      filterOn: !this.state.filterOn
    })
  }
  componentDidMount() {
    this.props.getPropertiesByAddress(this.props.match.params.query);
    window.scrollTo(0, 0)
  }

  componentWillMount() {
    this.setState({ filteredProperties: this.props.properties.items });
  }
  onClickGrid() {
    this.setState({
      isGrid: true,
      isList: false
    });
  }
  onClickList() {
    this.setState({
      isGrid: false,
      isList: true
    });
  }
  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.forceUpdate();
  }

  render() {
    if (!this.props.properties.items) {
      return null;
    }
    const filter = () => {
      return (
        <div className="row bg-light">
          <div className="col-3">
            <article class="card-group-item">
              <header class="card-header">
                <h6 class="title">Price Range </h6>
              </header>
              <div class="filter-content">
                <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label>Min</label>
                      <input
                        type="number"
                        class="form-control"
                        name="minPrice"
                        placeholder="$0"
                        min="0"
                        max="50000000"
                        onChange={this.onChange}
                      />
                    </div>
                    <div class="form-group col-md-6 text-right">
                      <label>Max</label>
                      <input
                        type="number"
                        class="form-control"
                        name="maxPrice"
                        placeholder="$50,000,000"
                        min="0"
                        max="50000000"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div className="col-3">
            <article class="card-group-item">
              <header class="card-header">
                <h6 class="title">Amenities</h6>
              </header>
              <div class="filter-content">
                <div class="card-body">
                  <label class="my-1 mr-2" for="bedroom-select">
                    Bedrooms
                    </label>
                  <select
                    class="custom-select my-1 mr-sm-2"
                    id="bedroom-select"
                    name="bedroom"
                    onChange={this.onChange}
                  >
                    <option selected value="0">
                      Any
                      </option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>

                  <label class="my-1 mr-2" for="bathroom-select">
                    Bathrooms
                    </label>
                  <select
                    class="custom-select my-1 mr-sm-2"
                    id="bathroom-select"
                    name="bathroom"
                    onChange={this.onChange}
                  >
                    <option selected value="0">
                      Any
                      </option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
              </div>
            </article>
          </div>
          <div className="col-3">
            <article class="card-group-item">
              <header class="card-header">
                <h6 class="title">Area</h6>
              </header>
              <div class="filter-content">
                <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label>Min</label>
                      <input
                        type="number"
                        class="form-control"
                        name="minArea"
                        placeholder="0"
                        min="0"
                        max="5000"
                        onChange={this.onChange}
                      />
                    </div>
                    <div class="form-group col-md-6 text-right">
                      <label>Max</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="5,000"
                        name="maxArea"
                        min="0"
                        max="5000"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div className="col-3">
            <article class="card-group-item">
              <header class="card-header">
                <h6 class="title">Properties</h6>
              </header>
              <div class="filter-content">
                <div class="card-body">
                  <label class="my-1 mr-2" for="bedroom-select">
                    Direction
                    </label>
                  <select
                    class="custom-select my-1 mr-sm-2"
                    name="direction"
                    id="bedroom-select"
                    onChange={this.onChange}
                  >
                    <option selected value="">
                      Any
                      </option>
                    {directionChoices}
                  </select>
                </div>
              </div>
            </article>
          </div>
        </div>
      )

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
    var items = this.props.properties.items
      .filter(p => {
        return p.price <= this.state.maxPrice && p.price >= this.state.minPrice;
      })
      .filter(p => {
        return p.numOfBedrooms >= this.state.bedroom;
      })
      .filter(p => {
        return p.numOfBathrooms >= this.state.bathroom;
      })
      .filter(p => {
        return p.area <= this.state.maxArea && p.area >= this.state.minArea;
      })
      .filter(p => {
        if (!this.state.direction) {
          return p;
        }
        return p.direction === this.state.direction;
      })

    const indexOfLastProperties = this.state.currentPage * this.state.itemsPerPage
    const indexOfFirstProperties = indexOfLastProperties - this.state.itemsPerPage
    const currentItems = items.slice(indexOfFirstProperties, indexOfLastProperties)
    const renderCurrentItemsGrid = currentItems.map(p => {
      return (
        <div className="col-3">
          <Link
            to={`/propertyDetails/${p._id}`}
            style={{ textDecoration: "none" }}
          >
            <div class="card text-dark property-card">
              {p.imageURL.length === 0 ? <img class="card-img-top img-grid" src='http://www.cbkhardware.com/pub/media/catalog/product/placeholder/default/noimage-1.png' alt="Card image cap" />
                : <img class="card-img-top img-grid" src={p.imageURL[0]} alt="Card image cap" />}
              <div class="card-body">
                <h5 class="card-title">{p.title}</h5>
                <p class="card-text">${p.price}</p>
                <hr />
                <div className="row text-muted text-left icon mt-1 mb-2">
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


      );
    });
    const renderCurrentItemsList = currentItems.map(p => {
      return (
        // <Link to={`/propertyDetails/${p._id}`} style={{ textDecoration: 'none' }} className='text-muted'>
        <React.Fragment>
          <div className="col-9 mb-2 mx-auto">
            <Link
              to={`/propertyDetails/${p._id}`}
              style={{ textDecoration: "transparent" }}
              className='text-muted'
            >
              <div className="card">
                <div className="card-horizontal">
                  {p.imageURL.length === 0 ? <img className="card-img-top card-image" src='http://www.cbkhardware.com/pub/media/catalog/product/placeholder/default/noimage-1.png' alt="Card image cap" />
                    : <img className="card-img-top card-image" src={p.imageURL[0]} alt="Card image cap" />}
                  <div className="card-body ml-5">
                    <div className="row">
                      <div>
                        <p className="card-title ml-10 mt-1" style={{ fontSize: 20, color: 'red' }}>{p.title}</p>
                      </div>
                      <div style={{ fontSize: 15 }} className="ml-auto">
                        <div class="vl d-inline-block">  <p className="ml-3 text-center"><strong>{p.numOfBedrooms}</strong> <br /> Beds</p></div>
                        <div class="vl d-inline-block">  <p className="ml-3 text-center"><strong>{p.numOfBathrooms}</strong> <br /> Bath</p></div>
                        <div class="vl d-inline-block">  <p className="ml-3 text-center"><strong>{p.area}</strong> <br />sqm</p></div>
                      </div>
                    </div>
                    <div className="row mb-3" style={{ fontSize: 20, color: 'black' }}>${' '}{p.price}</div>
                    <div className="row">
                      <p>{p.address}{', '}{p.city}{', '}{p.province}</p>
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          </div>

        </React.Fragment>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.properties.items.length / this.state.itemsPerPage); i++) {
      pageNumbers.push(i)
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <button
          className='page-btn btn btn-outline-danger'
          key={number}
          id={number}
          onClick={this.onClickPageNumber}
        >
          {number}
        </button>
      );
    });
    return (
      <SearchResultsWrapper>
        <div>
          <NavBar />
        </div>
        <div className="views bg-light">
          <div className="row">
            <button
              className={
                this.state.isGrid ? "btn btn-light mr-1 active" : "btn btn-light mr-1 "
              }
              title="Grid View"
              onClick={this.onClickGrid}
            >
              <i class="fas fa-th" />
            </button>
            <button
              className={
                this.state.isList ? "btn btn-light mr-1 active" : "btn btn-light  mr-1"
              }
              title="List View"
              onClick={this.onClickList}
            >
              <i class="fas fa-list" />
            </button>
            <div className='text-center pl-3'>
                <button class="btn btn-outline-dark" onClick={this.toggleFilter}>
                  <i class="fas fa-filter"></i>{'  '} FILTER
                </button>
            </div>
          </div>
        </div>
            {this.state.filterOn ? filter():null}
        <div className="row margin mt-5">
              
          {this.state.isGrid ? renderCurrentItemsGrid : renderCurrentItemsList}

        </div>
        <div className="row">
          <div className="mx-auto mb-5">
          {renderPageNumbers}
          </div>
        </div>
        
        <ScrollUp />
        <Footer />
      </SearchResultsWrapper>
    );
  }
}

const SearchResultsWrapper = styled.div`
.vl {
 margin-right:1rem;
  border-left: 1px solid #6C757D;
  height: 2.5rem;
}
.card-horizontal {
    display: flex;
    flex: 1 1 auto;
}
.card-horizontal:hover {
    transform : scale(1.02)
}
.card-image{
  width:300px;
  height: 180px
}
  .views {
    margin-top: 3.5rem;
    padding: 1rem;
  }
  .views .row {
    margin-left: 10rem;
  }

  .filter {
    margin-top: 3.5rem;
  }
  .icon {
    margin-top: -1rem;
  }
  ${'' /* .address {
    margin-bottom: -0.7rem;
  } */}
  .fas {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .property-card{
    width: 340px;
    height: 400px;
  }
  .property-card:hover {
    transform: scale(1.05);
  }
  .margin {
    margin-bottom: 3rem;
    margin-left: 10rem;
    margin-right: 10rem;
  }

`;
const mapStateToProps = state => ({
  properties: state.properties
});
export default withRouter(
  connect(
    mapStateToProps,
    { getPropertiesByAddress }
  )(SearchResults)
);
