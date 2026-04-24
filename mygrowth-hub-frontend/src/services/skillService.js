import axios from "axios";
import { getToken } from "../utils/token";

const API_URL = "http://localhost:5000/api/skills";

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});

export const getSkills = async () => {
  const response = await axios.get(API_URL, authHeaders());
  return response.data;
};

export const createSkill = async (skillData) => {
  const response = await axios.post(API_URL, skillData, authHeaders());
  return response.data;
};

export const updateSkill = async (id, skillData) => {
  const response = await axios.put(`${API_URL}/${id}`, skillData, authHeaders());
  return response.data;
};

export const deleteSkill = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, authHeaders());
  return response.data;
};