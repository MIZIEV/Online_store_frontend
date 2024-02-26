import axios from "axios";
import {BASE_URL} from "./apiConfig";

interface RegistrationData {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}

async function registerUser(userData: RegistrationData) {
	try {
		const response = await axios.post(`${BASE_URL}/register`, userData);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { registerUser };
