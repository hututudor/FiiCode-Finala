import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class ProtectedRoute extends React.Component {
  renderAuthRoute = () => {
    const {component: Component} = this.props;

    if(this.props.user.auth) {
      return <Component {...this.props} />
    } else {
      return <Redirect to="/login" />
    }
  }

  render() {
    const {component: Component, ...rest} = this.props;
    return <Route {...rest} render={this.renderAuthRoute} />
  }
}

const mapStateToProps = state => {
	return { user: state.auth.user };
};

export default connect(mapStateToProps)(ProtectedRoute);
