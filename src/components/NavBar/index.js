import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import AccountBox from '@material-ui/icons/AccountBox';
import { compose } from 'recompose';
import styles from './styles';

class NavBar extends React.PureComponent {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">SharEx</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/debts">Debts</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Dropdown navbar alignRight="false">
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            {/* Dropdown Button */}
            <AccountBox />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
};

export default compose()(NavBar);
