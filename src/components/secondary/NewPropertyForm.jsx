import React, { Component } from 'react'
import styled from 'styled-components'
export default class NewPropertyForm extends Component {

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  
  render() {
    return (
      <NewPropertyFormWrapper>
        <div className='mdc-text-field'>
          <input type="text" className="mdc-text-field__input"/>
          <div className="mdc-line-ripple"></div>
          <label className="mdc-floating-label">Name</label>
        </div>
      </NewPropertyFormWrapper>
    )
  }
}

const NewPropertyFormWrapper = styled.div`

`