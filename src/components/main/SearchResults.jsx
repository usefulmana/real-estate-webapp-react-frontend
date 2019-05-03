import React, { Component } from 'react'

export default class SearchResults extends Component {

  constructor(props){
    super(props)
    this.state = {
      properties :[]
    }
  }
  componentDidMount() {
    fetch('http://localhost:3000/property').then(res => res.json()).then(data => console.log(data))
  }
  

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
