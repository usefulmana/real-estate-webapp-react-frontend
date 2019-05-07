import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Card, CardImg, CardText, CardBody, Button } from "reactstrap";
import Image from "react-image-resizer";
import EditUserInfo from "./EditUserInfo";

class UserCard extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      avatar: ""
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    fetch("http://localhost:3000/auth/user", {
      headers: {
        "x-auth-token": this.props.auth.token
      }
    })
      .then(res => res.json())
      .then(user => this.setState({ user: user }));
    if (!this.state.user.avatar) {
      this.setState({
        avatar: "https://avatars0.githubusercontent.com/u/42512663?s=400&v=4"
      });
    }
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    console.log(this.state.user.avatar);
    const authLinks = (
      <Fragment>
        <div>
          <Card>
            <CardImg
              top
              width="80%"
              src={this.state.avatar}
              alt="Card image cap"
            />

            <CardBody className="text-center">
              <h2>{this.state.user.name}</h2>
              <hr className="w-50" />
              <CardText>
                <p className="text-muted">
                  <span className="icon">
                    <i class="fas fa-envelope" />
                  </span>
                  {this.state.user.email}
                </p>
                <p className="text-muted">
                  <span className="icon">
                    <i className="fas fa-phone" />
                  </span>
                  {"    "}
                  {this.state.user.phone}
                </p>
              </CardText>
            </CardBody>
          </Card>
          <div className="text-center mt-4">
            <EditUserInfo/>
          </div>
        </div>
      </Fragment>
    );

    return (
      <UserCardWrapper>{isAuthenticated ? authLinks : null}</UserCardWrapper>
    );
  }
}

const UserCardWrapper = styled.div`
.icon{
  margin-right: 1rem;
}`;
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(UserCard);
