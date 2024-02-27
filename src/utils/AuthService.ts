import axios from "axios";

const BASE_URL = "http://13.60.5.92:8080/api/auth";

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
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}