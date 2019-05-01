import React, { Component } from 'react'
import styled from 'styled-components'

export default class SearchBar extends Component {
  render() {
    return (
      <SearchBarWrapper>
      <div className="main">
          <div class="form-group has-search">
            <span class="fa fa-search form-control-feedback"></span>
            <input type="text" class="form-control" placeholder="City, Address" />
          </div>
      </div>
      </SearchBarWrapper>
    )
  }
}

const SearchBarWrapper = styled.div`
.main {
    width: 30%;
    margin: 150px auto;
}
.has-search .form-control {
    padding-left: 2.375rem;
}
input{
  height: auto;
  border-radius: 2rem;
  z-index:5
}
.has-search .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
}
`