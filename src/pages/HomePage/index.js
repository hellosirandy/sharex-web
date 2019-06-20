import React from 'react';
import { compose } from 'recompose';
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
