import React, { Component, Fragment } from 'react'
import {logout} from '../../actions/authActions'
import {connect} from 'react-redux'

class Logout extends Component {
  render() {
    return (
      <Fragment>
        
      </Fragment>
    )
  }
}
 export default connect(null,{logout})(Logout)