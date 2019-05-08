import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, CardImg, CardText, CardBody } from "reactstrap";
export default class ContactCard extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
        };
    }
    componentDidMount() {
        this.fetchUser();
    }
    fetchUser(){
        if(this.props.userID)
     {   fetch(`http://localhost:3000/user/${this.props.userID}`)
        .then(res=>res.json())
        .then(user => this.setState({user: user}))}
    }
  render() {
      console.log(this.props.userID)
    return (
      <ContactCardWrapper>
            <Card>
                <CardImg
                    top
                    width="50%"
                    src={this.state.user.avatar}
                    alt='avatar'
                />

                <CardBody className="text-center">
                    <h2>{this.state.user.name}</h2>
                    <hr className="w-50" />
                    <CardText>
                        <p className="text-muted">
                            <span className="icon">
                                <i class="fas fa-envelope" title='Email Address' />
                            </span>
                            {this.state.user.email}
                        </p>
                        <p className="text-muted">
                            <span className="icon">
                                <i className="fas fa-phone" title='Phone #' />
                            </span>
                            {"    "}
                            {this.state.user.phone}
                        </p>
                    </CardText>
                </CardBody>
            </Card>
      </ContactCardWrapper>
    )
  }
}

const ContactCardWrapper = styled.div``