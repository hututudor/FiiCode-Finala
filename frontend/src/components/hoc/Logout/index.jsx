import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    return '';
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.auth.logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
