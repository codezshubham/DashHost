import axios from "axios";

const LOCALHOST = 'http://localhost:8080';
export const API_BASE_URL = LOCALHOST;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
