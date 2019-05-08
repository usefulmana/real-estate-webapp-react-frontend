import React, { Component } from 'react'
import styled from 'styled-components'
import NavBar from '../secondary/NavBar';
import {connect} from 'react-redux'
import { getPropertiesByID } from '../../actions/propertyActions';
import ContactCard from '../secondary/ContactCard'
import PropertyDetailCard from '../secondary/PropertyDetailCard';
import Footer from '../secondary/Footer'
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
    console.log(this.props.property.item.user)
    // const test = this.props.property.item.user.map( u=>{return(<div>{u.name}</div>)})
    return (
      <PropertyDetailWrapper>
        <div>
          <NavBar/>
          {/* <div>{test}</div> */}
          <div className='bg-dark '>
            <div id="carouselwithIndicators" class="carousel slide w-50 mx-auto" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2s"></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img class = "d-block w-100" 
                     src = "https://www.tutorialspoint.com/bootstrap/images/slide1.png" 
                     alt = "First slide"></img>
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100"
                    src="https://www.tutorialspoint.com/bootstrap/images/slide2.png"
                    alt="Second slide"/>
               </div>

                <div class="carousel-item">
                  <img class="d-block w-100"
                    src="https://www.tutorialspoint.com/bootstrap/images/slide3.png"
                    alt="Third slide"/>
               </div>
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
  padding-bottom: 5rem}`

const mapStateToProps = state => ({
  auth: state.auth,
  property: state.properties
})
export default connect(mapStateToProps, { getPropertiesByID })(PropertyDetail)