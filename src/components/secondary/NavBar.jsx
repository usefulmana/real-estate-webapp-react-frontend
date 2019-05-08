import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import Registration from '../main/Registration'
import Login from '../main/Login'
import Logout from '../main/Logout'
import SearchBar from './SearchBar'
class NavBar extends Component {
  constructor(){
    super()
    this.state = {
      query: '',
      isOpen: false
    }
    this.onChange = this.onChange.bind(this)
  }
 
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = ( 
      <Fragment>
        <div className="nav-item ml-auto">
            <span className='navbar-text mr-3 '>
              <strong>{user ? `Welcome, ${user.name}!` : ''}</strong>
            </span>
        </div>
        <div>
        <Link to = '/dashboard'>
            <button className="btn-link btn"><strong>DASHBOARD</strong></button>
        </Link>
        </div>
        <div className="nav-item">
          <Logout/>
        </div>
      </Fragment>
      )
    
    const guestLinks = (
      <Fragment>
        <div className="nav-item ml-auto">
          <Login />
        </div>
        <div className="nav-item">
          <Registration />
        </div>
      </Fragment>
    );


    return (
      <NavBarWrapper>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <Link to="/">
              <i className="navbar-brand fas fa-home"> HOMELY</i>
            </Link>
            <form className="form-inline">
               <input className="form-control" type="search" placeholder="Address, City, Province" name="query" id="search" onChange={this.onChange}/>
              <Link to={`results/${this.state.query}`}>
                <span className="input-group-append"><button class="btn btn-search my-2 my-sm-0 " type="submit">
                  <i class="fa fa-search"></i>
                </button>
                </span>  
              </Link>   
            </form>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContentLG"
              aria-controls="navbarSupportedContentLG"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContentLG"
            >
                {isAuthenticated ? authLinks : guestLinks}
            </div>
          </nav>
        </div>
      </NavBarWrapper>
    );
  }
}

const NavBarWrapper = styled.div`
strong{

}
input:placeholder-shown {
    border-color: purple;
    text-overflow: ellipsis;
}
.form-inline{
  width: 57%;
  display: flex;
  justify-content: left;
}
.form-inline input{
  border: none;
  max-height: 32px;
  background:#FB6A6A;
  height: auto;
  border-radius: 2rem;
}

.form-inline #search{
  width: 30%;
}

  nav {
    background: #f93838;
  }
  .btn {
    color: white !important;
    font-weight: 5;

  }
`;
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(NavBar);