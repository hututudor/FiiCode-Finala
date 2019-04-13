import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Image, Header } from 'semantic-ui-react';
import actions from '../../../../../../redux/actions';
import Lang from '../../../../../hoc/Lang/index';
import EditAlbumModalForm from './EditForm';

class EditAlbumModal extends Component {
	closeModal = () => {
		this.props.closeModal();
	};

	render() {
		return (
			<Modal
				open={this.props.open}
				onClose={() => this.closeModal()}
				size="small"
			>
				<Modal.Header>
					<Lang>dashboard.albums.modals.edit.title</Lang>
				</Modal.Header>
				<EditAlbumModalForm />
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		open: state.modals.editAlbums
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeModal: () => dispatch(actions.modals.toggleModal('editAlbums', false))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditAlbumModal);
