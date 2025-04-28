// src/services/auth.js
import axios from 'axios';

export async function registerUser({ firstName, lastName, email, password, companyName, companyGST }) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/users/register', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            company_name: companyName,
            company_gst: companyGST
        });
        return response.data;
    } catch (error) {
        console.error('Registration Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.detail || 'Registration failed');
    }
}

export async function loginUser(email, password) {
    try {
        // You need to create a /users/login API in FastAPI to validate login
        const response = await axios.post('http://127.0.0.1:8000/users/login', { email, password });
        localStorage.setItem("loggedInUser", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error('Login Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.detail || 'Login failed');
    }
}

export function logoutUser() {
    localStorage.removeItem("loggedInUser");
}

export function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
}
