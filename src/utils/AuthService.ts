import { HOST } from "./host";
import api from "./api";

const HOST_PORT = HOST;
const BASE_URL = "http://" + HOST_PORT + "/api/auth";

interface RegistrationData {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	password: string;
}

export async function registerUser(userData: RegistrationData) {
	try {
		const response = await api.post(`${BASE_URL}/register`, userData);
		return response.data;
	} catch (error) {
		if (error.response && error.response.data) {
			throw error.response.data;
		} else {
			throw error;
		}
	}
};

interface LoginData {
	email: string;
	password: string;
}

export async function loginUser(userData: LoginData) {
	try {
		const response = await api.post(`${BASE_URL}/login`, userData);

		saveToken(response.data.accessToken);
		saveRefreshToken(response.data.refreshToken);

		console.log("--------------tokens----------")
		console.log(localStorage.getItem("token"))
		console.log(localStorage.getItem("refreshToken"))
		console.log("--------------tokens----------")
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const saveLoggedInUser = (email: string, role: string, firstName: string, lastName: string, phoneNumber: string) => {
	console.log("saved email - " + email + "saved role - " + role + " firstName - " + firstName);
	localStorage.setItem("authenticatedEmail", email);
	localStorage.setItem("authenticatedFirstName", firstName);
	localStorage.setItem("authenticatedLastName", lastName);
	localStorage.setItem("authenticatedPhonenumbar", phoneNumber);
	localStorage.setItem("role", role);
};

export function saveRefreshToken(token: string) {
	localStorage.setItem("refreshToken", "Bearer " + token);
}

export function getRefreshToken(): string | null {
	return localStorage.getItem('refreshToken');
}

export const isUserLoggedIn = (): boolean => {
	const email = localStorage.getItem("authenticatedEmail");
	return email !== null;
}

export const getLoggedInUser = () => {
	const firstName = localStorage.getItem("authenticatedFirstName");
	console.log("username saved - " + firstName);
	return firstName as string;
}

export function saveToken(token: string) {
	localStorage.setItem('token', "Bearer " + token);
}

export function getToken(): string | null {
	console.log("get token - " + localStorage.getItem('token'));
	console.log("get refresh token - " + localStorage.getItem('refreshToken'));
	return localStorage.getItem('token');
}

export function logout() {
	localStorage.clear();
	sessionStorage.clear();
}

export const isAdminUser = () => {
	const role = localStorage.getItem("role");
	return role === "ROLE_ADMIN";
};