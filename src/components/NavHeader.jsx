import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, Dropdown, Container } from 'semantic-ui-react';

@connect((store) => {
  return {
    authenticated: store.auth.authenticated
  }
})

class Header extends Component {
  
  renderLink() {
    if(this.props.authenticated) {
      return [
        <Menu.Item key={1}>
          <Dropdown text='Add' pointing className='link item' className='nav-dropdown'>
            <Dropdown.Menu>
              <Dropdown.Item><Link to="/create-org">Organization</Link></Dropdown.Item>
              <Dropdown.Item><Link to="/create-proj">Project</Link></Dropdown.Item>
              <Dropdown.Item><Link to="/criteria">Criteria</Link></Dropdown.Item>
              <Dropdown.Item><Link to="/eval-period">Eval Period</Link></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>,
        <Menu.Menu position='right' key={2}>
          <Menu.Item>
            <Link to="/signout">Sign Out</Link>
          </Menu.Item>
        </Menu.Menu>
      ];
    } else {
      return [
        <Menu.Item key={1}>
          <Link to="/signin"> Sign in</Link>
        </Menu.Item>,
        <Menu.Item key={2}>
          <Link to="/signup"> Sign up</Link>
        </Menu.Item>
      ]
    }
  }
  
  render() {
    return (
        <Menu size="large">
          <Container>
            <Menu.Item>
              <Link to="/">Home</Link>
            </Menu.Item>
            {this.renderLink()}
          </Container>
        </Menu>
    );
  }
}

export default Header;