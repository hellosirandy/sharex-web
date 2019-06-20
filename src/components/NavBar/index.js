import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import AccountBox from '@material-ui/icons/AccountBox';
import { compose } from 'recompose';
import styles from './styles';
import { signOut } from '../../store/actions/auth';

class NavBar extends React.PureComponent {
  handleSignOutClick = () => {
    this.props.onSignOut();
  }
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/#/">SharEx</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/#/debts">Debts</Nav.Link>
          </Nav>
          <Dropdown navbar alignRight>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {/* Dropdown Button */}
              <AccountBox />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={this.handleSignOutClick}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>

      </Navbar>
    );
  }
}

NavBar.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: () => dispatch(signOut()),
  };
};

export default compose(connect(null, mapDispatchToProps))(NavBar);
