import React, { Component } from 'react'
import styled from 'styled-components'
import NavBar from '../secondary/NavBar';
import PropertyManager from './PropertyManager';
import ProjectManager from './ProjectManager';
import Footer  from '../secondary/Footer'
export default class Dashboard extends Component {
  render() {
    return (
      <DashboardWrapper>
        <NavBar />
        <div>
           <div className="row tab">
             <div className="col-3">
              <div className="card">
                <img src="https://s.zillowstatic.com/homepage/static/Buy_a_home.png" className="card-img-top" alt="Buy a house" />
                <div className="card-block">
                  <h4 className="card-title text-center text-bold">Buy a Home</h4>
                  <p className="card-text text-center">Find your place with an immersive photo experience and the most listings, including
                                things you won't find anywhere else.</p>
                  <div className="text-center">
                    <button className="btn">Search Properties</button>
                  </div>
                </div>
              </div>
             </div>
            <div className="col-9">
              <ul class="nav nav-tabs ">
                <li class="nav-item ">
                  <a class="nav-link text-muted active" data-toggle="tab" href="#home">Your Properties</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link  text-muted " data-toggle="tab" href="#menu1">Your Projects</a>
                </li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane container mt-5   active" id="home">
                  <PropertyManager/>
                </div>
                <div class="tab-pane container mt-5" id="menu1">
                  <ProjectManager/>
                </div>
              </div>
            </div>
           </div>
        </div>
        <Footer />
      </DashboardWrapper>
    )
  }
}


const DashboardWrapper = styled.div`
.tab{
  margin-top: 8rem;
  margin-left:15rem;
  margin-right:15rem;
  margin-bottom: 10rem;
}
`