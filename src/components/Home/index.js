import { withAuthorization } from '../Session';

import { lifecycle } from 'recompose';
import React, { Component } from 'react';
import uuid from 'uuid/v4';







class HomePage extends Component {
  state = {
    flaga: true
  }
  handleClick = () => {

    this.setState({
      flaga: !this.state.flaga

    })
  }

  render() {
    return (
      <>

        <button onClick={this.handleClick}>{this.state.flaga ? "JEST" : "BRAK"}</button>
        <h1>{this.state.flaga ? "JEST" : null}</h1>
      </>
    );
  }
}
















const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);

