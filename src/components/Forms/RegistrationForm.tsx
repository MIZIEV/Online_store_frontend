import React, { useState } from 'react';
import './Form.modules.scss'; // Підключення стилів

const RegistrationForm: React.FC = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
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

		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		try {
			const userData = {
				firstName,
				lastName,
				username,
				email,
				password
			};

			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(userData)
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
				<input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
			</div>
			<div className="form-group">
				<input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
			</div>
			<div className="form-group">
				<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
			</div>
			<div className="form-group">
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
			</div>
			<div className="form-group">
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
			</div>
			<div className="form-group">
				<input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
			</div>
			<button type="submit" className="btn btn-primary">Sign Up</button>
		</form>
	);
};

export default RegistrationForm;
