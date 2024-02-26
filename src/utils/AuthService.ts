// AuthService.ts
import axios from "axios";

const BASIC_AUTH_URL = "http://13.60.5.92:8080/api/auth"

interface RegistrationData {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}

async function registerUser(userData: RegistrationData): Promise<boolean> {
	try {
		const response = await fetch(BASIC_AUTH_URL + "/register", {
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

/*async function registerUser(RegistrationData: RegistrationData) {
   console.log(RegistrationData);
   try {
	 const response = await axios.post("http://13.60.5.92:8080/api/auth/register", RegistrationData);
	 console.log(response);
	 return response.data;
   } catch (error) {
	 console.error(error);
	 throw error;
   }
 }*/

export { registerUser };
