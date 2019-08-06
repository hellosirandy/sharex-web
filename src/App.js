import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthPage from './pages/AuthPage';
import { getToken } from './store/actions/auth';
import HomePage from './pages/HomePage';
import DebtsPage from './pages/DebtsPage';
import { getCouple } from './store/actions/couple';
import { getExpense } from './store/actions/expense';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    this.initialLoad();
  }
  initialLoad = async () => {
    const token = await this.props.onCheckAuthenticated();
    if (token) {
      await Promise.all([
        this.props.onGetCouple(),
        this.props.onGetExpense(),
      ]);
    }
    this.setState({ loaded: true });
  }
  render() {
    const { isAuthenticated } = this.props;
    const { loaded } = this.state;
    return (
      loaded ? (
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={(p) => {
                if (isAuthenticated) {
                  return (<HomePage />);
                }
                return (<Redirect to={{ pathname: '/signin', state: { nextPathName: p.location.pathname } }} />);
              }}
            />
            <Route
              path="/debts"
              exact
              render={(p) => {
                if (isAuthenticated) {
                  return (<DebtsPage />);
                }
                return (<Redirect to={{ pathname: '/signin', state: { nextPathName: p.location.pathname } }} />);
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
      ) : <div />
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onCheckAuthenticated: PropTypes.func.isRequired,
  onGetCouple: PropTypes.func.isRequired,
  onGetExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: Boolean(state.auth.token),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCouple: () => dispatch(getCouple()),
    onCheckAuthenticated: () => dispatch(getToken()),
    onGetExpense: () => dispatch(getExpense()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
