// AuthService.ts

interface RegistrationData {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}

async function registerUser(userData: RegistrationData): Promise<boolean> {
	try {
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

		return true; // Успішно зареєстровано
	} catch (error) {
		console.error('Registration error:', error);
		return false; // Помилка під час реєстрації
	}
}

export { registerUser };
