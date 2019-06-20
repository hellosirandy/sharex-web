import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthPage from './pages/AuthPage';
import { checkAuthenticated } from './store/actions/auth';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    props.onCheckAuthenticated();
  }
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/signin" component={AuthPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onCheckAuthenticated: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: Boolean(state.auth.token),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthenticated: () => dispatch(checkAuthenticated()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
