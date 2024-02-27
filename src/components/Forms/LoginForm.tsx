
import React, { useState } from 'react';
import './Form.modules.scss';
import { loginUser } from '../../utils/AuthService';

const LoginForm: React.FC = () => {
	const [usernameOrEmail, setUsernameOrEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail)) {
			setError('Invalid email address');
			return;
		}

		if (password.length < 6) {
			setError('Password must be at least 6 characters long');
			return;
		}

		try {
			const userData = {
				usernameOrEmail,
				password
			}

			const success = await loginUser(userData);

			if (success) {
				setSuccess(true);
			} else {
				setError('Login failed');
			}

		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			<h2>Sign In</h2>

			{loading && <div>Loading...</div>}
			{error && <div className="error">{error}</div>}
			{success && <div>login successful!</div>}

			{error && <div className="error">{error}</div>}
			<div className="form-group">
				<input type="email" value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} placeholder="Email" required />
			</div>
			<div className="form-group">
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
			</div>
			<button type="submit" className="btn btn-primary">Sign In</button>
		</form>
	);
};

export default LoginForm;
