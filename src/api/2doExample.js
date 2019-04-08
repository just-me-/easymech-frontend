/* TMP Example => DEL */

// @flow

/* Use the exported functions to call the API.
 * If necessary, adapt the backend address below:
 */

const backend = "http://152.96.56.57:40002";

export function addTodo(name: string): Promise<SaveResult> {
  return postJson("/api/todo", {name}, "POST").then(parseJSON);
}
export function updateTodo(id: string, name: string, isComplete: bool): Promise<SaveResult> {
  let task = {
    id: id, isComplete: isComplete, name: name
  }
  return postJson("/api/todo/"+id, task, "PUT").then(parseJSON);
}
export function deleteTodo(id: string): Promise<SaveResult> {
  return fetch(backend + '/api/todo/' + id, {
    method: 'DELETE'
  })
  .then(parseJSON);
}

export function getTodos(): Promise<{ result: Array<Todo> }> {
  return getJson(
    `/api/todo`
  ).then(parseJSON);
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

function getJson(endpoint: string) {
  return fetch(`${backend}${endpoint}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  }).then(checkStatus);
}

function postJson(endpoint: string, params: Object, method = "POST") {
  return fetch(`${backend}${endpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(params)
  }).then(checkStatus);
}
