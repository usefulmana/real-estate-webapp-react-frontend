import React, { Component } from 'react'
import styled from 'styled-components'
import BannerPhoto from '../../img/banner.jpg'
import SearchBar from './SearchBar';
export default class Banner extends Component {
  render() {
    return (
      <BannerWrapper>
          <img src={BannerPhoto} alt="Banner Photo" />
          <div className="centered">
          <h1>Home Reimagined</h1>
          <p className="text-center">We'll help you find a place you'll love </p>
          </div>
          <div className="search-bar">
            <SearchBar />
          </div>  
      </BannerWrapper>
    )
  }
}

const BannerWrapper = styled.div`
h1{
  color:white;
  font-size: 50px;
}

p{
  color:white;
  margin-top: 20px;
  margin-bottom: -100px;
}
img{
  z-index:1;
}
.search-bar{
    position:relative;
    z-index:5;
    color:white;
    margin-top: -500px;
}
.centered {
  position: absolute;
  top: 28%;
  left: 50%;
  transform: translate(-50%, -50%);
}
`