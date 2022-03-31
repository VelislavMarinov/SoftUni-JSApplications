import * as api from "./api.js";

export async function createAlbum(body) {
  return await api.post("/data/albums", body);
}

export async function getAllCatalogs() {
  return await api.get("/data/albums?sortBy=_createdOn%20desc&distinct=name");
}

export async function getAlbumDetails(id) {
  return await api.get(`/data/albums/${id}`);
}

export async function editAlbum(id, body) {
  return await api.put(`/data/albums/${id}`, body);
}

export async function deleteAlbum(id) {
  return await api.del(`/data/albums/${id}`);
}

export async function getAlbumsByName(query) {
  return await api.get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}
