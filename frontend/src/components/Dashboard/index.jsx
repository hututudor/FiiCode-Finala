import React, { Component } from 'react';
import {Grid, Menu, Button, Label, List, Segment, Header} from 'semantic-ui-react';
import './style.scss';
import * as nephews from '../../services/nephewsService';
import EditModal from '../Modals/Edit';
import AddModal from '../Modals/Add';
import DeleteModal from '../Modals/Delete';
import {withRouter} from 'react-router-dom';

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

  logout = () => {
    this.props.history.push('/logout');
  }

  refresh = () => {
    nephews.getAll().then(res => {
      this.setState({nephews: res.data.nephews, active: 0});
    })
  }

  handleItemClick = (e, name) => this.setState({ active: name });

  toggleModal = (m) => this.setState({[m]: !this.state[m]});

  addNephew = (data) => {
    this.setState({
      nephews: [{...data, points: 0}, ...this.state.nephews]
    })
  };

  editNephew = (id, data) => {
    let nephews = { ...this.state.nephews };

    nephews = this.state.nephews.map((nephew, index) => {
      if (nephew.id !== id) {
        return nephew;
      } else {
        return data;
      }
    });

    console.log(nephews);

    this.setState({
      nephews
    })
  };

  deleteNephew = (id) => {
    let nephews = { ...this.state.nephews };

    nephews = this.state.nephews.map((nephew, index) => {
      if (nephew.id !== id) {
        return nephew;
      }
    });

    console.log(nephews);

    this.setState({
      nephews
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.active != -1 && (<React.Fragment>
            <EditModal show={this.state.editModal} user={this.state.nephews[this.state.active]} closeModal={() => this.toggleModal('editModal')} editNephew={this.editNephew} />
            <DeleteModal show={this.state.removeModal} user={this.state.nephews[this.state.active]} closeModal={() => this.toggleModal('removeModal')} deleteNephew={this.deleteNephew} />
          </React.Fragment>)
          }
          <AddModal show={this.state.addModal} addNephew={this.addNephew} closeModal={() => this.toggleModal('addModal')} />
        <Grid style={{minHeight: '100vh', margin: '10px'}}>
          <Grid.Column width={4} >
            <Menu vertical style={{width: '100%'}}>
              {
                this.state.nephews.map((neph, index) => (
                  <Menu.Item active={this.state.active == index} onClick={e => this.handleItemClick(e, index)} key={neph.id}>
                    <Label>{neph.points}</Label>
                    {neph.name}
                  </Menu.Item>
                ))
              }

              <Menu.Item name='updates'>
                <Button color="green" onClick={() => this.toggleModal('addModal')}>Add new</Button>
              </Menu.Item>

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
            {this.state.active !== -1 ? (<Segment>
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

              <Button color="yellow" onClick={() => this.toggleModal('editModal')}>Edit</Button>
              <Button color="red" onClick={() => this.toggleModal('removeModal')}>Delete</Button>
              <Button color="blue" onClick={() => this.refresh()}>Refresh</Button>
              <Button color="purple" onClick={() => this.logout()}>Logout</Button>
            </Segment>) : null}
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withRouter(Dashboard);