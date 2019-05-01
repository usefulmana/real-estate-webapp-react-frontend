import React, { Component } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

export default class NavBar extends Component {
  render() {
    return (
      <NavBarWrapper>
      <div>
          <nav className="navbar navbar-expand-lg navbar-dark">
            <Link to='/'>
              <i className="navbar-brand fas fa-home">  HOMELY</i>
            </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContentLG" aria-controls="navbarContentLG" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarContentLG">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to='/login'>
                    <button className='btn btn-link'> LOG IN</button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='/register'>
                    <button className='btn register'> REGISTER</button>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>  
      </div>
        
      </NavBarWrapper>
    )
  }
}

const NavBarWrapper = styled.div`

nav{
  background: #F93838;
}
 .btn{
  color:white !important;
  font-weight: 500;
}
.register{
  background-color: #DF2B2B;
}
`
