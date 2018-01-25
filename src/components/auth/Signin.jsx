import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Container, Input, Label, Button, Form } from 'semantic-ui-react';

@connect((store) => {
  return {
    errorMessage: store.auth.error
  }
})

class Signin extends Component {

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops!</strong>{this.props.errorMessage}
        </div>
      );
    }
  }

  handleFormSubmit(values) {
    this.props.dispatch(actions.signinUser({
      email: values.email,
      password:values.password
    }, () => {
      this.props.history.push('/create-org');
    }));
  }

  renderField(field) {
    return (
      <Form.Field>
        <label>{field.label}</label>
        <Input
          type={field.fieldType}
          {...field.input}
        />
      </Form.Field>
    );
  }
  
  render() {
    // handleSubmit comes from redux-from
    const { handleSubmit } = this.props;
    return(
      <Container>
        <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            label="Email"
            fieldType="text"
            name="email"
            component = {this.renderField}
          />
          <Field
            label="Password"
            fieldType="password"
            name="password"
            component = {this.renderField}
          />
          {this.renderAlert()}
          <Button type='submit'>Sign in</Button>
        </Form>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'signin'
})(Signin);