import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthPage from './pages/AuthPage';
import { checkAuthenticated } from './store/actions/auth';
import HomePage from './pages/HomePage';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    props.onCheckAuthenticated();
  }
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              component={HomePage}
              render={(p) => {
                if (isAuthenticated) {
                  return (<HomePage />);
                }
                return (<Redirect to={{ pathname: '/signup', state: { nextPathName: p.location.pathname } }} />);
              }}
            />
            <Route
              path="/signin"
              render={({ location }) => {
                if (isAuthenticated) {
                  return (
                    <Redirect
                      to={
                        (location.state && location.state.nextPathName) ?
                          location.state.nextPathName : '/'
                      }
                    />
                  );
                }
                return <AuthPage />;
              }}
            />
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
