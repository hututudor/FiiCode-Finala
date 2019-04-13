import React, { Component } from 'react';
import Logo from '../hoc/Logo';
import './style.scss';
import { Button } from 'semantic-ui-react';
import InfoModal from '../Modals/Info';
import { connect } from 'react-redux';

class Home extends Component {
  state = {
    info: false
  };

  goTo = link => {
    this.props.history.push(link);
  };

  toggleModal = () => {
    this.setState({ info: !this.state.info });
  };

  render() {
    return (
      <React.Fragment>
        <InfoModal
          show={this.state.info}
          closeModal={() => this.toggleModal()}
        />
        <div className="cont">
          <div className="divcont">
            <h1>
              <Logo size={60} />
            </h1>
            <p>Monitor all your nephews easily</p>
            <div className="buttons">
              {this.props.auth ? (
                <React.Fragment>
                  <Button
                    onClick={() => this.goTo('/dashboard')}
                    size="big"
                    color="blue"
                  >
                    Dashboard
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button
                    onClick={() => this.goTo('/login')}
                    size="big"
                    color="blue"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => this.goTo('/register')}
                    size="big"
                    color="purple"
                  >
                    Register
                  </Button>
                </React.Fragment>
              )}
              <Button
                onClick={() => this.toggleModal()}
                size="big"
                color="orange"
              >
                How to use?
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.user.auth
  };
};

export default connect(mapStateToProps)(Home);
