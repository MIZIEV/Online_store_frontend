// LoginForm.tsx

import React, { useState } from 'react';
import './Form.modules.scss';
import { loginUser, saveLoggedInUser } from '../../utils/AuthService';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
	const [usernameOrEmail, setUsernameOrEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	// const [success, setSuccess] = useState(false); // Додали стан success

	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail)) {
			setError('Invalid email address');
			return;
		}

		if (password.length < 5) {
			setError('Password must be at least 5 characters long');
			return;
		}

		try {
			const userData = {
				usernameOrEmail,
				password
			};

			setLoading(true); // Встановлюємо стан загрузки на true
			const response = await loginUser(userData);

			if (response) {
				saveLoggedInUser(usernameOrEmail, response.role);
				navigate('/'); // Використовуємо функцію navigate для перенаправлення
			} else {
				setError('Login failed');
			}

		} catch (error) {
			console.error(error);
			setError('An error occurred'); // Встановлюємо повідомлення про помилку
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			<h2>Sign In</h2>

			{loading && <div>Loading...</div>}
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