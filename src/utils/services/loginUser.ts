import axios from "axios";
import {BASE_URL} from "./apiConfig";

interface LoginData {
	email: string;
	password: string;
}

async function loginUser(userData: LoginData) {
	try {
		const response = await axios.post(`${BASE_URL}/login`, userData);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { loginUser };
