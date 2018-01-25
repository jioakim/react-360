import React, { Component } from 'react';
import Select from 'react-select';
import { Container } from 'semantic-ui-react';
import axios from 'axios';


class SelectBoxUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backspaceRemoves: true,
			multi: true,
			creatable: false
    }
    this.onChange = this.onChange.bind(this);
    this.switchToMulti = this.switchToMulti.bind(this);
    this.switchToSingle = this.switchToSingle.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.gotoUser = this.gotoUser.bind(this);
    this.toggleBackspaceRemoves = this.toggleBackspaceRemoves.bind(this);
    this.toggleCreatable = this.toggleCreatable.bind(this);
  }

	onChange (value) {
		this.setState({
			value: value,
		});
  }
  
	switchToMulti () {
		this.setState({
			multi: true,
			value: [this.state.value],
		});
	}
  
  switchToSingle () {
		this.setState({
			multi: false,
			value: this.state.value ? this.state.value[0] : null
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
  
	gotoUser (value, event) {
		window.open(value.html_url);
  }
  
	toggleBackspaceRemoves () {
		this.setState({
			backspaceRemoves: !this.state.backspaceRemoves
		});
  }
  
	toggleCreatable () {
		this.setState({
			creatable: !this.state.creatable
		});
	}
	render () {
		const AsyncComponent = this.state.creatable
			? Select.AsyncCreatable
			: Select.Async;

		return (
			<div className="section">
				<AsyncComponent multi={this.state.multi} value={this.state.value} onChange={this.onChange} onValueClick={this.gotoUser} valueKey="ID" labelKey="fullName" loadOptions={this.getUsers} backspaceRemoves={this.state.backspaceRemoves} />
				<div className="checkbox-list">
					<label className="checkbox">
						<input type="radio" className="checkbox-control" checked={this.state.multi} onChange={this.switchToMulti}/>
						<span className="checkbox-label">Multiselect</span>
					</label>
					<label className="checkbox">
						<input type="radio" className="checkbox-control" checked={!this.state.multi} onChange={this.switchToSingle}/>
						<span className="checkbox-label">Single Value</span>
					</label>
				</div>
				<div className="checkbox-list">
					<label className="checkbox">
					   <input type="checkbox" className="checkbox-control" checked={this.state.creatable} onChange={this.toggleCreatable} />
					   <span className="checkbox-label">Creatable?</span>
					</label>
					<label className="checkbox">
					   <input type="checkbox" className="checkbox-control" checked={this.state.backspaceRemoves} onChange={this.toggleBackspaceRemoves} />
					   <span className="checkbox-label">Backspace Removes?</span>
					</label>
				</div>
			</div>
		);
	}
}

export default SelectBoxUsers;