import React, { Component } from 'react'
import styled from 'styled-components'
import BannerPhoto from '../../img/banner.jpg'
import SearchBar from './SearchBar';
export default class Banner extends Component {
  render() {
    return (
      <BannerWrapper>
          <div className="banner">
          <img src={BannerPhoto} alt="Banner" />
          <div className="centered">
            <h1>Home Reimagined</h1>
            <p className="text-center">We'll help you find a place you'll love </p>
          </div>
          </div>
          
      </BannerWrapper>
    )
  }
}

const BannerWrapper = styled.div`
input::-webkit-input-placeholder {
    color: white;
}

input:-ms-input-placeholder {
    color: white;
}
input::-moz-placeholder {
    color: white;
}
.banner{
  margin-bottom: -20rem;
}
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
.centered {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
`