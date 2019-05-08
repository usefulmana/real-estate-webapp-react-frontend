import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, CardImg, CardText, CardBody } from "reactstrap";
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { getPropertiesByID } from '../../actions/propertyActions';

class ContactCard extends Component {
    constructor(props){
        super(props)
        this.setState = {
            user: []
        }
    }
    componentDidMount() {
    }
  render() 
  {
      if(!this.props.user){
          return null
      }
    return (
      <ContactCardWrapper>
            <Card>
                <CardImg
                    top
                    width="50%"
                    src={this.props.user.avatar}
                    alt='avatar'
                />
                <CardBody className="text-center">
                    <h3>Contact</h3>
                    <hr className="w-50" />
                    <CardText>
                        <p className="text-muted">
                            <span className="icon">
                                <i class="fas fa-user" title="Poster Name"></i>
                            </span>{' '}
                            {this.props.user.name}
                        </p>
                        <p className="text-muted">
                            <span className="icon">
                                <i class="fas fa-envelope" title='Email Address' />
                            </span>{' '}
                            {this.props.user.email}
                        </p>
                        <p className="text-muted">
                            <span className="icon">
                                <i className="fas fa-phone" title='Phone #' />
                            </span>
                            {"    "}
                            {this.props.user.phone}
                        </p>
                    </CardText>
                </CardBody>
            </Card>
      </ContactCardWrapper>
    )
  }
}
ContactCard.propTypes = {
    user: PropTypes.object.isRequired
}

const ContactCardWrapper = styled.div``

const mapStateToProps = state => ({
    auth: state.auth,
    property: state.properties
})
export default connect(mapStateToProps, { getPropertiesByID })(ContactCard)