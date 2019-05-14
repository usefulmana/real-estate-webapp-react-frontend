import React, { Component } from 'react'
import styled from 'styled-components'
import NavBar from '../secondary/NavBar';
import {connect} from 'react-redux'
import { getPropertiesByID } from '../../actions/propertyActions';
import ContactCard from '../secondary/ContactCard'
import PropertyDetailCard from '../secondary/PropertyDetailCard';
import Footer from '../secondary/Footer'
import NotAvailable from '../../img/NotAvailable.jpg'


class PropertyDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
    property: [],
    }
  }
  componentDidMount() {
    this.props.getPropertiesByID(this.props.match.params.id)
  }
  render() {
    if (!this.props.property.item.user && !this.props.property.item.project){
      return null;
    }
    const defaultCarouselItem =()=>{
        return(
          <div className="carousel-item active">
            <img class="d-block w-100 h-100"
              src={NotAvailable}
              alt="Not Available"></img>
          </div>
        )
    }
    var carouselItems = () =>{
      return(
        <React.Fragment>
          <div className="carousel-item active">
            <img class="d-inline-block "
              src={this.props.property.item.imageURL[0]}
              alt="First slide"
              width="1000px" 
              height="700px">
                
              </img>
          </div>
          {this.props.property.item.imageURL.slice(1).map(url => {
            return (
              <div className="carousel-item">
                <img class="d-block w-100 h-100"
                  src={url}
                  alt="First slide"></img>
              </div>
            )
          })}
        </React.Fragment>
      )
    }
    // const test = this.props.property.item.user.map( u=>{return(<div>{u.name}</div>)})
    return (
      <PropertyDetailWrapper>
        <div className="row">
          <NavBar />
        </div>
        <div>
        
          {/* <div>{test}</div> */}
          <div className='bg-dark row pt-10'>
            <div id="carouselwithIndicators" class="carousel slide w-50 mx-auto" data-ride="carousel">
              <div className="carousel-inner">
              {this.props.property.item.imageURL.length==0 ? defaultCarouselItem():
                carouselItems()
              }
              </div>
              <a class="carousel-control-prev" href="#carouselwithIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>

              <a class="carousel-control-next" href="#carouselwithIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div className='bg-light'>
            <div className="row cards">
              <div className="col-3">
                <ContactCard user={this.props.property.item.user} />
              </div>
              <div className="col-9">
                <PropertyDetailCard property={this.props.property.item} project={this.props.property.item.project}/>
              </div>
            </div>
          </div> 
          <Footer/>       
        </div>
      </PropertyDetailWrapper>
    )
  }
}

const PropertyDetailWrapper = styled.div`
.cards{
  padding-top: 3rem;
  margin-left:25rem;
  margin-right:25rem;
  padding-bottom: 5rem}
 .carousel-inner img {
  text-align:center
}
.carousel{
  min-height: 700px
}`

const mapStateToProps = state => ({
  auth: state.auth,
  property: state.properties
})
export default connect(mapStateToProps, { getPropertiesByID })(PropertyDetail)