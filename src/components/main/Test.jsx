import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getProjects } from '../../actions/projectActions';
import {getProperties} from '../../actions/propertyActions'

class Test extends Component {
    componentDidMount() {
      this.props.getProperties();
    }
    
  render() {
      const properties = this.props.properties.map(p => (
          <div key={p._id}>
              <p>{p.title}</p>
          </div>
      ))
    return (
      <div>
        <h1>PROJECTS</h1>
            {properties}
      </div>
    )
  }
}

const mapStateToProps = state =>({
    properties: state.properties.items
})
export default connect(mapStateToProps, {getProperties})(Test)