import axios from "axios";
import {BASE_URL} from "./apiConfig";

interface LoginData {
	usernameOrEmail: string;
	password: string;
}

async function loginUser(userData: LoginData) {
	try {
		const response = await axios.post(`${BASE_URL}/login`, userData);
		console.log(response.data)
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { loginUser };