import axios from "axios";

// This is the backend URL. If .env is missing, it uses localhost.
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Axios is like a messenger that sends data to our server
// This sends new user details to the backend register route.
export const registerAPI = (name: string, email: string, password: string) =>
  axios.post(`${API}/api/auth/register`, { name, email, password });

// This sends login details to the backend login route.
export const loginAPI = (email: string, password: string) =>
  axios.post(`${API}/api/auth/login`, { email, password });

// This gets the current user info using the stored token.
export const meAPI = (token: string) =>
  axios.get(`${API}/api/auth/me`, createAuthHeader(token));

// This can be used later when an API route needs the user's token.
export const createAuthHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});
