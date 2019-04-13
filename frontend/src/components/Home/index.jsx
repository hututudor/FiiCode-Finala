import React, { Component } from 'react';
import Logo from '../hoc/Logo';
import './style.scss';
import {
  Button,
} from 'semantic-ui-react';

class Home extends Component {
  goTo = link => {
    this.props.history.push(link);
  }

  render() {
    return (
      <React.Fragment>
        <div className="cont">
          <div className="divcont">
            <h1>
              <Logo size={60} />
            </h1>
            <p>Monitor all your nephews easily</p>
            <div className="buttons">
              <Button onClick={() => this.goTo('/login')} size="big" color="blue">Login</Button>
              <Button onClick={() => this.goTo('/register')} size="big" color="purple">Register</Button>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default Home;
