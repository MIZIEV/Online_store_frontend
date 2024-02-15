
import React, { useState } from 'react';
import './Form.modules.scss'; // Підключення стилів

const RegistrationForm: React.FC = () => {
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
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			if (!response.ok) {
				throw new Error('Registration failed');
			}

			// Відповідна обробка успішної реєстрації
		} catch (error) {
			setError('Registration failed');
		}
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			<h2>Sign Up</h2>
			{error && <div className="error">{error}</div>}
			<div className="form-group">
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
			</div>
			<div className="form-group">
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
			</div>
			<button type="submit" className="btn btn-primary">Sign Up</button>
		</form>
	);
};

export default RegistrationForm;
