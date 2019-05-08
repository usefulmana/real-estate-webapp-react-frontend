import React, { Component } from 'react'
import styled from 'styled-components'
import NavBar from '../secondary/NavBar';
import PropertyManager from './PropertyManager';
import ProjectManager from './ProjectManager';
import Footer  from '../secondary/Footer'
import UserCard from '../secondary/UserCard';
export default class Dashboard extends Component {
  render() {
    return (
      <DashboardWrapper>
        <NavBar />
        <div>
           <div className="row tab">
             <div className="col-3">
              <UserCard/>
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
  margin-bottom: 20rem;
}
`