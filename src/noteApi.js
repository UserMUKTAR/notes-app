

import axios from "axios";

const API_URL = "http://localhost:8080/api/notes";

export const getNotes = () => axios.get(API_URL);

export const createNote = (note) => axios.post(API_URL, note);

export const deleteNote = (id) => axios.delete(`${API_URL}/${id}`);
