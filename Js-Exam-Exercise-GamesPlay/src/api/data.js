import * as api from "./api.js";

export async function createGame(body) {
  return await api.post("/data/games", body);
}

export async function getAllGames() {
  return await api.get("/data/games?sortBy=_createdOn%20desc");
}

export async function getNewGames() {
  return await api.get(
    "/data/games?sortBy=_createdOn%20desc&distinct=category"
  );
}

export async function getGameDetails(id) {
  return await api.get(`/data/games/${id}`);
}

export async function editGame(id, body) {
  return await api.put(`/data/games/${id}`, body);
}

export async function deleteGame(id) {
  return await api.del(`/data/games/${id}`);
}

export async function getComentsForGame(gameId) {
  return await api.get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function createComment(body) {
  return await api.post("/data/comments", body);
}
