import React, { Component } from 'react';
import { Modal, Image, Header } from 'semantic-ui-react';
import EditModalForm from './EditForm';

class EditModal extends Component {
	render() {
		return (
			<Modal
				open={this.props.show}
				onClose={() => this.props.closeModal}
				size="small"
			>
				<Modal.Header>
					Edit nephew
				</Modal.Header>
				<EditModalForm user={this.props.user} closeModal={this.props.closeModal} editNephew={this.props.editNephew} />
			</Modal>
		);
	}
}

export default EditModal;
