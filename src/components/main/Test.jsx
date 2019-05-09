import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getProjects } from '../../actions/projectActions';
import {getProperties} from '../../actions/propertyActions'

class Test extends Component {
  state ={
    imageUrls: []
  }
    componentDidMount() {
    }
    addImageURL = (e) =>{
      this.setState(prevState => ({
        imageUrls: [...prevState.imageUrls]
      }))
    }
    
  render() {
    return (
      <div>
      <input type="text" placeholder="imageUrl"/>
       <button className="btn" onClick={this.handleClick}>ADD MORE</button>
       {imageUrls.map(url =>  {
         return(
           <div className="" key={id}>
             <input type="text" placeholder="imageUrl" />
           </div>
         )
       })}
      </div>
    )
  }
}

const mapStateToProps = state =>({
    properties: state.properties.items
})
export default connect(mapStateToProps, {getProperties})(Test)