import axios from "axios";
import { getToken } from "../utils/token";

const API_URL = "http://localhost:5000/api/notes";

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});

export const getNotes = async () => {
  const response = await axios.get(API_URL, authHeaders());
  return response.data;
};

export const createNote = async (noteData) => {
  const response = await axios.post(API_URL, noteData, authHeaders());
  return response.data;
};

export const searchNotes = async (query) => {
  const response = await axios.get(`${API_URL}/search?q=${query}`, authHeaders());
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, authHeaders());
  return response.data;
};