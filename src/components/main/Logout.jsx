import React, { Component, Fragment } from 'react'
import {logout} from '../../actions/authActions'
import {connect} from 'react-redux'
import styled from 'styled-components'
import { Button} from 'reactstrap';
class Logout extends Component {
  render() {
    return (
      <Fragment>
      <LogoutWrapper>
          <Button outline color='danger' onClick={this.props.logout}>
            <strong>LOGOUT</strong>
        </Button>
      </LogoutWrapper>
      </Fragment>
    )
  }
}
const LogoutWrapper = styled.div`
.logout:hover {
    transform: scale(1.1);
  }
`
 export default connect(null,{logout})(Logout)