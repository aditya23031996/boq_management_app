// src/services/auth.js
import axios from 'axios';

export async function registerUser({ firstName, lastName, email, password, companyName, companyGST }) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/user/register', {
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
    const res = await fetch("/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");
    const data = await res.json();
    return data;
}

export function logoutUser() {
    localStorage.removeItem("loggedInUser");
}

export function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
}
