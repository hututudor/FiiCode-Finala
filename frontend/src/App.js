import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import Logout from './components/hoc/Logout';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/404" exact component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;