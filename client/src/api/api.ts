import axios from "axios";

const API_URL = "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 60 * 1000,
});
