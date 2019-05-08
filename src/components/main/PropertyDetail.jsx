import React, { Component } from 'react'
import styled from 'styled-components'
import NavBar from '../secondary/NavBar';
import {connect} from 'react-redux'
import { getPropertiesByID } from '../../actions/propertyActions';
import ContactCard from '../secondary/ContactCard'
import { Card, CardImg, CardText, CardBody } from "reactstrap";

class PropertyDetail extends Component {
  constructor(){
    super()
    this.state = {
      property: [],
     posterID:'',
     poster:[]
    }
  }
  componentDidMount() {
    this.props.getPropertiesByID(this.props.match.params.id)
    this.setState({posterID:this.props.property.item.user})
    this.fetchUser()
    // this.fetchPropertyByID(this.props.match.params.id)
  }
  fetchUser() {
    if (this.state.posterID) {
      fetch(`http://localhost:3000/user/${this.props.posterID}`)
      .then(res => res.json())
      .then(user => this.setState({ poster: user }))
    }
  }
  fetchInfo(){
    Promise.all([])
  }
  // fetchPropertyByID(pid){
  //   fetch(`http://localhost:3000/property/byId/${pid}`)
  //   .then(res => res.json())
  //   .then(p => this.setState({property:p}))
  // }
  // fetchUser() {
  //   if (this.props.userID) {
  //     fetch(`http://localhost:3000/user/${this.props.property.user}`)
  //     .then(res => res.json())
  //     .then(user => this.setState({ user: user }))
  //   }
  // }
  render() {
   console.log(this.state.poster)
    return (
      <PropertyDetailWrapper>
        <div>
          <NavBar/>
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
          <div>
            <div className="row cards">
              <div className="col-3">
                <ContactCard/>
              </div>
              <div className="col-9">

              </div>
            </div>
          </div>        
        </div>
      </PropertyDetailWrapper>
    )
  }
}

const PropertyDetailWrapper = styled.div`
.cards{
  margin-top: 5rem;
  margin-left:15rem;
  margin-right:15rem;
  margin-bottom: 10rem;}`

const mapStateToProps = state => ({
  auth: state.auth,
  property: state.properties
})
export default connect(mapStateToProps, { getPropertiesByID })(PropertyDetail)