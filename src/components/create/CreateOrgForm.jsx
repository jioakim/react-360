import React, { Component } from 'react';
import Select from 'react-select';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Container, Button, Form, Input } from 'semantic-ui-react';
import axios from 'axios';

@connect((store) => {
  return {
    message: store.auth.message,
    user: store.auth.user
  }
})

class CreateOrgForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backspaceRemoves: true,
			multi: false,
      creatable: false,
      value: ''
    }
    this.onChange = this.onChange.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

	onChange (value) {
		this.setState({
			value: value,
		});
  }
  
	getUsers (input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

    return axios.get (
    `http://localhost:3090/search/typed-user?typedInUser=${input}`, 
    {
      headers: { authorization: localStorage.getItem('token') }
    })
		.then((response) => {
      return { options: response.data }
    })
		.catch((err) => {
      console.log(err);
    })
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
  
	render () {
		const AsyncComponent = this.state.creatable
			? Select.AsyncCreatable
      : Select.Async;
    console.log(this.state.value);
    const { handleSubmit } = this.props;
		return (
			<div className="section">
        <label id="createOrglabel1">Set the administrator of the organization - if no admin is assigned you will be the admin by default</label>  
        <AsyncComponent multi={this.state.multi} value={this.state.value}
          onChange={this.onChange} onValueClick={this.gotoUser} valueKey="ID" labelKey="display" 
          loadOptions={this.getUsers} backspaceRemoves={this.state.backspaceRemoves} />
        <br />
        <Form>
          <Field
            label="Organization Name"
            fieldType="text"
            name="orgName"
            component = {this.renderField}
          />
          <Field
            label="Short Organization Description"
            fieldType="text"
            name="orgShortDescription"
            component = {this.renderField}
          />
          {this.renderAlert()}
          <Button type='submit'>Create Organization</Button>
        </Form>
      </div>
		);
	}
}

function validate(values) {
  const errors = {};

  // if (!values.fullName) {
  //   errors.fullName = 'Please enter your full name';
  // }
  
  return errors;
}

export default reduxForm({
  validate,
  form: 'createOrg'
})(CreateOrgForm);