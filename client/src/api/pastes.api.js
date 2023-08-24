import axios from "axios";

export const createPasteRequest = async (paste) =>
  await axios.post("http://localhost:4000/api/create", paste);

export const getPasteRequest = async (idPaste) =>
  await axios.get(`http://localhost:4000/api/paste/${idPaste}`);

export const getRawPasteRequest = async (idRawPaste) =>
  await axios.get(`http://localhost:4000/api/paste/raw/${idRawPaste}`);

export const getGlobalVisitors = async () =>
  await axios.get('http://localhost:4000/api/visitors');