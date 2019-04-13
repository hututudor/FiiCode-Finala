import React from 'react';
import FormClass from '../../../hoc/FormClass';
import { Modal, Form, Icon, Message, Button } from 'semantic-ui-react';
import _ from 'lodash';
import Joi from 'joi-browser';
import {toast} from 'react-toastify';
import * as nephew from '../../../../services/nephewsService';

class AddModalForm extends FormClass {
  state = {
    data: {
      name: '',
      github: ''
    },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label('Name'),
    github: Joi.string()
      .required()
      .label('Github'),
  };

  closeModal = () => {
    this.props.closeModal();
  };

  doSubmit = () => {
    nephew
      .add({
        name: this.state.data.name,
        github: this.state.data.github,
        color: 'red'
      })
      .then(res => {
        this.props.addNephew(res.data.nephew);
        toast.success('Saved!');
        this.closeModal();
      })
      .catch(err => {
        console.log(err);
        toast.error('Error saving!');
      });
  };

  render() {
    return (
      <React.Fragment>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit} size="large">
              <Form.Input
                fluid
                name="name"
                placeholder="Name"
                label="Name"
                onChange={this.handleChange}
                value={this.state.data.name}
                className={this.getClass('name')}
                type="text"
              />

              <Form.Input
                fluid
                name="github"
                placeholder="Github"
                label="Github"
                onChange={this.handleChange}
                value={this.state.data.github}
                className={this.getClass('github')}
                type="text"
              />

            </Form>
            {_.isEmpty(this.state.errors) ? (
              ''
            ) : (
              <Message error>
                <h3>
                  Errors
                </h3>
                {this.displayErrors()}
              </Message>
            )}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            labelPosition="left"
            icon
            negative
            onClick={() => this.closeModal()}
          >
            <Icon name="remove" />
            Cancel
          </Button>
          <Button
            labelPosition="right"
            icon
            positive
            onClick={event => this.handleSubmit(event)}
          >
            <Icon name="save" />
            Save
          </Button>
        </Modal.Actions>
      </React.Fragment>
    );
  }
}

export default AddModalForm;
