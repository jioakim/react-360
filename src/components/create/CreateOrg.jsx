import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Container, Item } from 'semantic-ui-react';
import CreateOrgForm from './CreateOrgForm.jsx';
import htmlToText from 'html-to-text';

@connect((store) => {
  return {
    message: store.auth.message,
    user: store.auth.user
  }
})

class CreateOrg extends Component {
  constructor(props) {
    super(props);
  }
  // componentWillMount() {
  //   // request to authenticated server endpoint
  //   this.props.dispatch(actions.fetchMessage());
  // }
  
  render() {
    return (
      <Container>
        <CreateOrgForm />
      </Container>
    );
  }
}

export default CreateOrg;