const backend = "http://sinv-56057.edu.hsr.ch:40006";

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error: Object = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {
  return response.json();
}

export function getJson(endpoint: string) {
  return fetch(`${backend}${endpoint}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  }).then(checkStatus);
}

export function postJson(endpoint: string, params: Object, method = "POST") {
  return fetch(`${backend}${endpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(params)
  }).then(checkStatus);
}
