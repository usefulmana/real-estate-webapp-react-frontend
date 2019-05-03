import React, { Component } from 'react'
import styled from 'styled-components'


export default class Footer extends Component {
  render() {
    return (
      <FooterWrapper>
        <div className="row text-center bg-dark">
          <div className="col-12 col-lg-4">
            <hr className="light-bar" />
            <h3>Follow Us</h3>
            <hr className="light-bar" />
            <div className="social">
              <p><a href="https://twitter.com/zillow"><i className="fab fa-twitter-square fa-2x"></i></a></p>
              <p><a href="https://www.linkedin.com/company/zillow/"><i className="fab fa-linkedin fa-2x"></i></a></p>
              <p><a href="https://www.facebook.com/Zillow"><i className="fab fa-facebook-square fa-2x"></i></a></p>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <hr className="light-bar" />
            <h3>Services</h3>
            <hr className="light-bar" />
            <div>
              <p> Real Estate Advertisement</p>
              <p> Real Estate Appraisal</p>
              <p> Realtor Training</p>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <hr className="light-bar" />
            <h3>Contact</h3>
            <hr className="light-bar" />
            <div className="contact text-center">
              <div>
                <div className="address text-center">
                  <a href="https://goo.gl/maps/9QRusDCsAz1nsHRc8">
                    <i className="fas fa-map-marker-alt" />
                    <p>10 Downing St, Westminster, London SW1A 2AA, UK</p>  
                  </a>                   
                </div>
              </div>
              <div>
                <i className="fas fa-phone" />
                <p className="address">Call us: (+84)903-054-777</p>
              </div>
              <div>
                <i className="fas fa-envelope" />
                <p className="address">
                  <a
                    href="mailto: alex.nguyen3141@gmail.com"
                  >
                    {" "}
                    alex.nguyen3141@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="text-center footer">
          <p> &copy; Alex Nguyen. All rights reserved.</p>
        </div>
      </FooterWrapper>
    )
  }
}

const FooterWrapper = styled.div`
.row{
  color:white;
}
.row .col-12{
  margin-top: 30px;
  margin-bottom: 40px;
}
.contact p{
  display: inline-block;
  margin-left:10px;
}
.contact a{
  color: white !important;
}
.footer{
  margin-top: -33px;
  padding-top:13px;
  padding-bottom:1px;
  top:0;
  color: white;
  background-color: #F93838;
}
.light-bar{
  width:70%;
  border: 1px solid white;
}
.social a{
  color:white;
  padding-top: 5px;
}
.social p:hover{
  transform: scale(1.1)
}
`
