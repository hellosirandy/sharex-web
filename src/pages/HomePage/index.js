import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import styles from './styles';
import NavBar from '../../components/NavBar';

class HomePage extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <NavBar />
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
};

export default compose()(HomePage);
