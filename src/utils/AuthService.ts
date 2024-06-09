import axios from "axios";
import { HOST } from "./host";

const HOST_PORT = HOST;
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
	email: string;
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

export const saveLoggedInUser = (email: string, role: string, firstName: string, lastName: string, phoneNumber: string) => {
	console.log("saved email - " + email + "saved role - " + role + " firstName - " + firstName);
	sessionStorage.setItem("authenticatedEmail", email);
	sessionStorage.setItem("authenticatedFirstName", firstName);
	sessionStorage.setItem("authenticatedLastName", lastName);
	sessionStorage.setItem("authenticatedPhonenumbar", phoneNumber);
	sessionStorage.setItem("role", role);
};

export const isUserLoggedIn = (): boolean => {
	const email = sessionStorage.getItem("authenticatedEmail");
	return email !== null;
}

export const getLoggedInUser = () => {
	const firstName = sessionStorage.getItem("authenticatedFirstName");
	console.log("username saved - " + firstName);
	return firstName as string;
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