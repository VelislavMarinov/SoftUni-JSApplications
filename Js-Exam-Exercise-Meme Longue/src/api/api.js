import { getUserData, setUserData, clearUserData } from "../utils.js";

async function request(url, options) {
  try {
    let response = await fetch(`http://localhost:3030${url}`, options);

    if (response.ok == false) {
      let error = response.json();
      throw new Error(error);
    }

    try {
      return await response.json();
    } catch (error) {
      return response;
    }
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

function getOptions(method = "GET", body) {
  let options = {
    method,
    headers: {},
  };

  if (body != undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const userData = getUserData();
  if (userData) {
    options.headers["X-Authorization"] = userData.token;
  }

  return options;
}

export async function get(url) {
  return await request(url, getOptions());
}

export async function post(url, body) {
  return await request(url, getOptions("POST", body));
}

export async function put(url, body) {
  return await request(url, getOptions("PUT", body));
}

export async function del(url) {
  await request(url, getOptions("DELETE"));
}

export async function login(email, password) {
  let result = await post("/users/login", { email, password });

  let userData = {
    username: result.username,
    email: result.email,
    token: result.accessToken,
    id: result._id,
    gender: result.gender,
  };

  setUserData(userData);
  return result;
}

export async function register(username, email, password, gender) {
  let result = await post("/users/register", {
    username,
    email,
    password,
    gender,
  });

  let userData = {
    username: result.username,
    email: result.email,
    token: result.accessToken,
    id: result._id,
    gender: result.gender,
  };

  setUserData(userData);
}

export async function logout() {
  get("/users/logout");
  clearUserData();
}

export function isLoggedIn() {
  return getUserData() ? true : false;
}
