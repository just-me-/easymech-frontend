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

export function checkResponse(response) {
    if(response.status !== 'ok') {
      throw new Error("Servermeldung: "+response.message);
    }
    return response.data;
}

export function convertToNumbers(dto, fieldsToConvert) {
  let convertedDto = dto;
  for (const key in fieldsToConvert) {
    let convertedNumber = parseInt(dto[fieldsToConvert[key]], 10);
    if (isNaN(convertedNumber))
      convertedNumber = 0;
    convertedDto[fieldsToConvert[key]] = convertedNumber;
  }
  return convertedDto;
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

export function deleteJson(endpoint: string) {
  return fetch(`${backend}${endpoint}`, {
    method: 'DELETE'
  }).then(checkStatus);
}
