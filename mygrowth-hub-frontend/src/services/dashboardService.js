import axios from "axios";
import { getToken } from "../utils/token";

const API_URL = "http://localhost:5000/api/dashboard";

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});

export const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/stats`, authHeaders());
  return response.data;
};