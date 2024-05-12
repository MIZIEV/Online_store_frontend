import axios from "axios";

const HOST_PORT = "localhost:8090";
const BASE_URL = "http://" + HOST_PORT + "/api/auth";

interface RegistrationData {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}

export async function registerUser(userData: RegistrationData) {
	try {
		const response = await axios.post(`${BASE_URL}/register`, userData);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

interface LoginData {
	usernameOrEmail: string;
	password: string;
}

export async function loginUser(userData: LoginData) {
	try {
		const response = await axios.post(`${BASE_URL}/login`, userData);
		saveToken(response.data.accessToken);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export const saveLoggedInUser = (username: string, role: string) => {
	console.log("saved username - " + username + "saved role - " + role);
	sessionStorage.setItem("authenticatedUser", username);
	sessionStorage.setItem("role", role);
};

export const isUserLoggedIn = () => {
	const username = sessionStorage.getItem("authenticatedUser");

	if (username == null) {
		return false;
	} else {
		return true;
	}
}

export const getLoggedInUser = () => {
	const username = sessionStorage.getItem("authenticatedUser");
	console.log("username saved - " + username);
	return username as string;
}

export function saveToken(token: string) {
	localStorage.setItem('token', "Bearer " + token);
}

export function getToken(): string | null {
	console.log("get token - " + localStorage.getItem('token'))
	return localStorage.getItem('token');
}

export function logout() {
	localStorage.clear();
	sessionStorage.clear();
}

export const isAdminUser = () => {
	const role = sessionStorage.getItem("role");
	return role === "ROLE_ADMIN";
};