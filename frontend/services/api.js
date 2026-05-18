import axios from "axios";


const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL,
});

// Attach JWT token automatically
API.interceptors.request.use((req) => {
const userInfo = localStorage.getItem("userInfo");

if (userInfo) {
req.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
}

return req;
});

export const getJobs = () => API.get("/");
export const getJob = (id) => API.get(`/${id}`);
export const createJob = (data) => API.post("/", data);
export const updateStatus = (id, data) => API.patch(`/${id}`, data);
export const deleteJob = (id) => API.delete(`/${id}`);
export const login = (credentials) => API.post("/auth/login", credentials);
export const register = (userData) => API.post("/auth/register", userData);