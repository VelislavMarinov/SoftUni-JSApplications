import { getUserData } from "../utils.js";
import * as api from "./api.js";

export const isLoggedIn = api.isLoggedIn;

export const login = api.login;

export const register = api.register;

export const logout = api.logout;

export async function getAllMemes() {
  return await api.get("/data/memes?sortBy=_createdOn%20desc");
}

export async function getMemeDetails(id) {
  return await api.get(`/data/memes/${id}`);
}

export async function deleteMeme(id) {
  return await api.del(`/data/memes/${id}`);
}

export async function getUserMemes() {
  let userData = getUserData();
  return await api.get(
    `/data/memes?where=_ownerId%3D%22${userData.id}%22&sortBy=_createdOn%20desc`
  );
}

export async function createMeme(body) {
  return await api.post("/data/memes", body);
}

export async function editMeme(body, id) {
  return await api.put(`/data/memes/${id}`, body);
}
