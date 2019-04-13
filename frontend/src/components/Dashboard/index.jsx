import React, { Component } from 'react';
import {Grid, Menu, Button, Label, List, Segment, Header} from 'semantic-ui-react';
import './style.scss';
import * as nephews from '../../services/nephewsService';
import EditModal from '../Modals/Edit';

class Dashboard extends Component {
  state = {
    nephews: [],
    active: -1,
    addModal: false,
    editModal: false,
    removeModal: false
  };

  componentDidMount = () => {
    nephews.getAll().then(res => {
      this.setState({nephews: res.data.nephews, active: 0});
    })
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    return (
      <React.Fragment>
        {this.state.active != -1 && (<React.Fragment>
              <EditModal show={this.state.editModal} user={this.state.nephews[this.state.active]} />
          </React.Fragment>)
          }
        <Grid style={{minHeight: '100vh'}}>
          <Grid.Column width={4} >
            <Menu vertical style={{width: '100%'}}>
              {
                this.state.nephews.map(neph => (
                  <Menu.Item name='updates' active={this.activeItem === 'updates'} onClick={this.handleItemClick} color={neph.color} key={neph.id}>
                    <Label>{neph.points}</Label>
                    {neph.name}
                  </Menu.Item>
                ))
              }

              {/*<Menu.Item name='updates' active={this.activeItem === 'updates'} onClick={this.handleItemClick}>*/}
                {/*<Label>1</Label>*/}
                {/*Updates*/}
              {/*</Menu.Item>*/}
            </Menu>

          </Grid.Column>
          <Grid.Column width={8}>
            <List divided relaxed>
              <List.Item>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
                  <List.Description as='a'>Updated 10 mins ago</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
                  <List.Description as='a'>Updated 22 mins ago</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
                  <List.Description as='a'>Updated 34 mins ago</List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            {this.state.active != -1 && (<Segment>
              <Header as="h3" style={{marginBottom: '3px'}}>Name</Header>
              {this.state.nephews[this.state.active].name}
              <br/>
              <Header as="h3" style={{marginBottom: '3px'}}>Github</Header>
              {this.state.nephews[this.state.active].github}
              <br/>
              <Header as="h3" style={{marginBottom: '3px'}}>Points</Header>
              {this.state.nephews[this.state.active].points}
              <br/>
              <br/>

              <Button color="yellow">Edit</Button>
              <Button color="red">Delete</Button>
              <Button color="blue">Refresh</Button>



            </Segment>)}
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

export default Dashboard;