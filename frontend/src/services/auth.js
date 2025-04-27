// src/services/auth.js

export function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((user) => user.email === email);
  
    if (userExists) {
      throw new Error("User already exists!");
    }
  
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
  }
  
  export function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email && user.password === password);
  
    if (!user) {
      throw new Error("Invalid email or password!");
    }
  
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  }
  
  export function logoutUser() {
    localStorage.removeItem("loggedInUser");
  }
  
  export function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
  }
  