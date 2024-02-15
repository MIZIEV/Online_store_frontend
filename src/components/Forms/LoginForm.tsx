
import React, { useState } from 'react';
import './Form.modules.scss'; 

const LoginForm: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setError('Invalid email address');
			return;
		}

		if (password.length < 6) {
			setError('Password must be at least 6 characters long');
			return;
		}

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			if (!response.ok) {
				throw new Error('Login failed');
			}

			// Відповідна обробка успішного входу
		} catch (error) {
			setError('Login failed');
		}
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			<h2>Sign In</h2>
			{error && <div className="error">{error}</div>}
			<div className="form-group">
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
			</div>
			<div className="form-group">
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
			</div>
			<button type="submit" className="btn btn-primary">Sign In</button>
		</form>
	);
};

export default LoginForm;
