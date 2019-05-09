import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import NavBar from "../secondary/NavBar";
import Footer from "../secondary/Footer";
import { getPropertiesByAddress } from "../../actions/propertyActions";
import { withRouter } from "react-router-dom";


class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlushed: false
    };
  }
  componentDidMount() {
    this.props.getPropertiesByAddress(this.props.match.params.query);
  }
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.match.params.query !== nextProps.match.params.query) {
  //     this.props.getPropertiesByAddress(nextProps.match.params.id);
  //   }
  // }
  render() {
    console.log(this.props.properties.items);
    return (
      <SearchResultsWrapper>
        <NavBar />
        <div />
        <Footer />
      </SearchResultsWrapper>
    );
  }
}

const SearchResultsWrapper = styled.div``;
const mapStateToProps = state => ({
  properties: state.properties
});
export default withRouter(connect(
  mapStateToProps,
  { getPropertiesByAddress }
)(SearchResults));
