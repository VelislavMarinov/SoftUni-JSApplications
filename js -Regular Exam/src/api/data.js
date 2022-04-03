import * as api from "./api.js";

export async function createPet(body) {
  return await api.post("/data/pets", body);
}

export async function getAllPets() {
  return await api.get("/data/pets?sortBy=_createdOn%20desc&distinct=name");
}

export async function getPetDetails(id) {
  return await api.get(`/data/pets/${id}`);
}

export async function editPet(id, body) {
  return await api.put(`/data/pets/${id}`, body);
}

export async function deletePet(id) {
  return await api.del(`/data/pets/${id}`);
}

export async function donate(body) {
  return await api.post(`/data/donation`, body);
}

export async function getPetDonation(id) {
  return await api.get(
    `/data/donation?where=petId%3D%22${id}%22&distinct=_ownerId&count`
  );
}
