import React, { Component } from 'react';
import { Modal, Image, Header } from 'semantic-ui-react';
import AddModalForm from './AddForm';

class EditModal extends Component {
	render() {
		return (
			<Modal
				open={this.props.show}
				onClose={() => this.props.closeModal}
				size="small"
			>
				<Modal.Header>
					Add nephew
				</Modal.Header>
				<AddModalForm user={this.props.user} closeModal={this.props.closeModal} addNephew={this.props.addNephew} />
			</Modal>
		);
	}
}

export default EditModal;
