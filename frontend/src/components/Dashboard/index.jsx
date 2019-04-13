import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import './style.scss';

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid style={{minHeight: '100vh'}}>
          <Grid.Column width={5} style={{background: 'red'}}>
            sad
          </Grid.Column>
          <Grid.Column>
              aa
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

export default Dashboard;