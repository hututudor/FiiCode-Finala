import React from 'react';
import Joi from 'joi-browser';
import FormClass from '../../hoc/FormClass';
import {
	Grid,
	Header,
	Message,
	Segment,
	Button,
	Form,
	Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import '../style.scss';
import Logo from '../../hoc/Logo';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import * as auth from '../../../services/authService';
import { toast } from 'react-toastify';

class Register extends FormClass {
	state = {
		data: { name: '', email: '', password: '' },
		errors: {},
		showPassword: false
	};

	schema = {
		name: Joi.string()
			.required()
			.label('Name'),
		email: Joi.string()
			.email()
			.required()
			.label('Email'),
		password: Joi.string()
			.required()
			.min(6)
			.max(30)
			.label('Password')
	};

	doSubmit = () => {
		this.setState({ loading: true });
		auth
			.register({
				name: this.state.data.name,
				email: this.state.data.email,
				password: this.state.data.password
			})
			.then(res => {
				this.props.updateUser(res.data.user, res.data.token);
				this.props.history.push('/dashboard');
			})
			.catch(err => {
				if (err.response) {
					if (err.response.data.email) {
						toast.error("Email is already taken!");
					}
				}
				this.setState({ loading: false });
			});
	};

	componentDidMount() {
		if (localStorage.getItem('token')) {
			this.props.history.push('/');
		}
	}

	render() {
		return (
			<Grid textAlign="center" verticalAlign="middle" className="auth">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h1" icon color="orange" textAlign="center">
						<Logo size={40} />
						<br />
            <br/>
						Register
					</Header>
					<Form onSubmit={this.handleSubmit} size="large">
						<Segment stacked>
							<Form.Input
								fluid
								name="name"
								icon="user"
								iconPosition="left"
								placeholder="Name"
								onChange={this.handleChange}
								value={this.state.data.name}
								className={this.getClass('name')}
								type="text"
							/>
							<Form.Input
								fluid
								name="email"
								icon="mail"
								iconPosition="left"
								placeholder={"Email"}
								onChange={this.handleChange}
								value={this.state.data.email}
								className={this.getClass('email')}
								type="email"
							/>

							<Form.Input
								fluid
								name="password"
								icon="lock"
								iconPosition="left"
								placeholder="Password"
								onChange={this.handleChange}
								value={this.state.data.password}
								className={this.getClass('password')}
								type="password"
							/>
							<br />

							<Grid columns={1} textAlign="center">
								<Button.Group fluid>
									<Button
										color="green"
										size="large"
										icon
										labelPosition="left"
										as={Link}
										to="/"
									>
										<Icon name="arrow left" />
										Back
									</Button>
									<Button
										disabled={this.state.loading}
										className={this.state.loading ? 'loading' : ''}
										color="orange"
										size="large"
										icon
										labelPosition="right"
									>
										<Icon name="arrow right" />
										Register
									</Button>
								</Button.Group>
							</Grid>
						</Segment>
					</Form>
					{_.isEmpty(this.state.errors) ? (
						''
					) : (
						<Message error>
							<h3>Error</h3>
							{this.displayErrors()}
						</Message>
					)}
					<Message>
						Have an account?{' '}
						<Link to="/login">
							Login here!
						</Link>
					</Message>
				</Grid.Column>
			</Grid>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateUser: (user, token) => dispatch(actions.auth.updateUser(user, token))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Register);
