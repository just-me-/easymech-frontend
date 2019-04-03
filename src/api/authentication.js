const backend = "http://localhost:3000";

export function login(
  login: string,
  password: string
): Promise<{ token: string, owner: User }> {
  return postJson("/auth/login", { login, password }).then(parseJSON);
}

export function signup(
  login: string,
  firstname: string,
  lastname: string,
  password: string
): Promise<User> {
  return postJson("/auth/register", {
    login,
    firstname,
    lastname,
    password
  }).then(parseJSON);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error: Object = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function getAuthenticatedJson(endpoint: string, token: string) {
  return fetch(`${backend}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  }).then(checkStatus);
}

function postJson(endpoint: string, params: Object) {
  return fetch(`${backend}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(params)
  }).then(checkStatus);
}

function postAuthenticatedJson(
  endpoint: string,
  token: string,
  params: Object
) {
  return fetch(`${backend}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(params)
  }).then(checkStatus);
}
