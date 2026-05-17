import axios from "axios";

const AUTH_API = axios.create({
baseURL: "http://localhost:5000/api/auth",
});

export const registerUser = (data) =>
AUTH_API.post("/register", data);

export const loginUser = (data) =>
AUTH_API.post("/login", data);
