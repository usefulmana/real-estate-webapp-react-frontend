import React, { Component } from 'react'
import NavBar from '../secondary/NavBar';
import Banner from '../secondary/Banner';
import Body from '../secondary/Body';
import Footer from '../secondary/Footer'
import ScrollUp from '../secondary/ScrollUp'
export default class Home extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Banner/>
        <Body/>
        <ScrollUp/>
        <Footer/>
      </div>
    )
  }
}
