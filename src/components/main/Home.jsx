import React, { Component } from 'react'
import NavBar from '../secondary/NavBar';
import Banner from '../secondary/Banner';
import Body from '../secondary/Body';

export default class Home extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Banner/>
        <Body/>
      </div>
    )
  }
}
