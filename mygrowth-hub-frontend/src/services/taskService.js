import axios from "axios";
import { getToken } from "../utils/token";

const API_URL = "http://localhost:5000/api/tasks";

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});

export const getTasks = async () => {
  const response = await axios.get(API_URL, authHeaders());
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData, authHeaders());
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API_URL}/${id}`, taskData, authHeaders());
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, authHeaders());
  return response.data;
};