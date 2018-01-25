import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Container, Input, Label, Button, Form } from 'semantic-ui-react';


@connect((store) => {
  return {
    errorMessage: store.auth.error
  }
})

class Signup extends Component {
  
  handleFormSubmit(values) {
    this.props.dispatch(actions.signupUser({
      email: values.email,
      password: values.password,
      fullName: values.fullName
    }, () => {
      this.props.history.push('/feature');
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
        {field.meta.touched && field.meta.error && 
        <div className="error">{field.meta.error}</div>}
      </Form.Field>
    );
  }
  
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops!</strong>{this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Container>
        <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            label="Full Name"
            fieldType="text"
            name="fullName"
            component = {this.renderField}
          />
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
          <Field
            label="Confirm Password"
            fieldType="password"
            name="passwordConfirm"
            component = {this.renderField}
          />
          <Button type="submit">Sign Up</Button>
          <br />
          {this.renderAlert()}
        </Form>
      </Container>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = 'Please enter your full name';
  }

  if (!values.email) {
    errors.email = 'Please enter an email';
  }

  if (!values.password) {
    errors.password = 'Please enter a password';
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm password';
  }

  if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  
  
  return errors;
}

export default reduxForm({
  validate,
  form: 'signup'
})(Signup);