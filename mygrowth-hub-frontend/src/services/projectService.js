import axios from "axios";
import { getToken } from "../utils/token";

const API_URL = "http://localhost:5000/api/projects";

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});

export const getProjects = async () => {
  const response = await axios.get(API_URL, authHeaders());
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await axios.post(API_URL, projectData, authHeaders());
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await axios.put(`${API_URL}/${id}`, projectData, authHeaders());
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, authHeaders());
  return response.data;
};