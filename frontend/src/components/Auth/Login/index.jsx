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
import {toast} from 'react-toastify';

class Login extends FormClass {
	state = {
		data: { email: '', password: '' },
		errors: {}
	};

	schema = {
		email: Joi.string()
			.email()
			.required()
			.label('Email'),
		password: Joi.string()
			.required()
			.label('Password')
	};

	doSubmit = () => {
		this.setState({ loading: true });
		auth
			.login({
				email: this.state.data.email,
				password: this.state.data.password
			})
			.then(res => {
				this.props.updateUser(res.data.user, res.data.token);
				this.props.history.push('/dashboard');
			})
			.catch(err => {
				toast.error('Invalid email or password');
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
						Login
					</Header>
					<Form onSubmit={this.handleSubmit} size="large">
						<Segment stacked>
							<Form.Input
								fluid
								name="email"
								icon="mail"
								iconPosition="left"
								placeholder="Email"
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
										Login
									</Button>
								</Button.Group>
							</Grid>
						</Segment>
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
					<Message>
            Not having an account?{' '}
						<Link to="/register">
							 Register here!
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
)(Login);
