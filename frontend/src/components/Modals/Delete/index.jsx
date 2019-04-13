import React, { Component } from 'react';
import { Image, Modal, Header, Button, Icon } from 'semantic-ui-react';
import * as nephew from '../../../services/nephewsService';
import { toast } from 'react-toastify';

class DeleteModal extends Component {
	closeModal = () => {
		this.props.closeModal();
	};

	deleteAlbum = () => {
		let id = this.props.user.id;

		nephew
			.remove(id)
			.then(res => {
				this.props.deleteNephew(id);
				toast.success('Deleted!');
			})
			.catch(err => {
				console.log(err);
				toast.error('Error deleting');
			});
		this.closeModal();
	};

	render() {
		return (
			<Modal
				open={this.props.show}
				onClose={() => this.closeModal()}
				size="tiny"
			>
				<Modal.Header>
					Delete nephew
				</Modal.Header>
				<Modal.Content>
					Are you sure you want to delete this nephew?
				</Modal.Content>
				<Modal.Actions>
					<Button
						labelPosition="left"
						icon
						negative
						onClick={() => this.closeModal()}
					>
						<Icon name="remove" />
						No
					</Button>
					<Button
						labelPosition="right"
						icon
						positive
						onClick={() => this.deleteAlbum()}
					>
						<Icon name="checkmark" />
						Yes
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}

export default DeleteModal;
