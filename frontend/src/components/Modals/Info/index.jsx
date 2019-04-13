import React, { Component } from 'react';
import { Image, Modal, Header, Button, Icon } from 'semantic-ui-react';

class InfoModal extends Component {

  render() {
    return (
      <Modal
        open={this.props.show}
        onClose={() => this.props.closeModal()}
        size="tiny"
      >
        <Modal.Header>
          How to use?
        </Modal.Header>
        <Modal.Content style={{fontSize: 20}}>
          <p>Firstly, create an account. You can do this by pressing the register button and then filling your name, email and password.</p>
          <p>When you need to login, click login and fill your data.</p>
          <p>When you are in the dashboard, you can add your nephews by clicking the add button.</p>
          <p>You will have a list of nephews on your left.</p>
          <p>You can view the nephew's repositories in the center.</p>
          <p>In the right, you can view details about the nephew, like name, GitHub username and points.</p>
          <p>You can modify a nephew by clicking edit.</p>
          <p>You can delete a nephew by clicking delete.</p>
          <p>You may need to refresh once in a while, so click the refresh button.</p>
          <p>You can logout using the logout button.</p>
          <p>The points are calculated like this: 5 points per repository and 1 per commit.</p>
          <p>If you have any questions, feel free to contact us on hututudor@yahoo.ro.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            labelPosition="left"
            icon
            negative
            onClick={() => this.props.closeModal()}
          >
            <Icon name="remove" />
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default InfoModal;
