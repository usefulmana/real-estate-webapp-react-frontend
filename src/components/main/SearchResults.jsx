import React, { Component } from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import NavBar from '../secondary/NavBar'
import Footer from '../secondary/Footer'
import { getPropertiesByAddress } from '../../actions/propertyActions';


class SearchResults extends Component {

  constructor(props){
    super(props)
    this.state = {
      query:'',
    
    }
  }
  componentDidMount() {
    this.props.getPropertiesByAddress(this.props.match.params.query)
  }
  

  render() {
    console.log(this.props.properties.items)
    return (
      <SearchResultsWrapper>
        <NavBar />
        <div>
          
        </div>
        <Footer/>
      </SearchResultsWrapper>
    )
  }
}

const SearchResultsWrapper = styled.div`

`
const mapStateToProps = state => ({
  properties : state.properties
})
export default connect(mapStateToProps, { getPropertiesByAddress })(SearchResults)