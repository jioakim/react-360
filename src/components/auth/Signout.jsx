import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Container } from 'semantic-ui-react';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }
  
  render() {
    return (
      <Container>
        <div>Sorry to se you go...</div>
      </Container>
    );
  }
}

export default connect(null, actions)(Signout);