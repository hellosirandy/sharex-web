import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import AuthPage from './pages/AuthPage';


function App() {
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

export default App;
