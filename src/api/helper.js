const backend = 'http://sinv-56057.edu.hsr.ch:40006';

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error: Object = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function checkResponse(response) {
  if (response.status !== 'ok') {
    const errorCodes = {
      200: 'Duplikat',
      201: 'Noch in Verwendung',
      203: 'Nicht vermietbar',
    };
    const errorCode = errorCodes
      ? errorCodes[response.errorCode]
      : `Unbekannter Fehler ${response.errorCode}`;
    throw Object.assign(
      new Error(`Fehlercode: ${errorCode} - Servermeldung: ${response.message}`),
      { code: response.errorCode, codeMsg: errorCode, msg: response.message },
    );
  }
  return response.data;
}

export function convertToNumbers(dto, fieldsToConvert) {
  const convertedDto = dto;
  for (const key in fieldsToConvert) {
    let convertedNumber = parseInt(dto[fieldsToConvert[key]], 10);
    if (isNaN(convertedNumber)) convertedNumber = 0;
    convertedDto[fieldsToConvert[key]] = convertedNumber;
  }
  return convertedDto;
}

function parseToDatabaseDate(date) {
  if (date && date.length > 0) {
    const arr = date.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4}).*/);
    date = `${arr[3]}-${arr[2]}-${arr[1]}`;
  }
  return date;
}

export function convertToDatabaseDates(dto, fieldsToConvert) {
  const convertedDto = dto;
  for (const key in fieldsToConvert) {
    // support neasted fields
    const key_arr = fieldsToConvert[key].split('.');
    if (key_arr && key_arr[1]) {
      convertedDto[key_arr[0]][key_arr[1]] = parseToDatabaseDate(dto[key_arr[0]][key_arr[1]]);
    } else {
      convertedDto[fieldsToConvert[key]] = parseToDatabaseDate(dto[fieldsToConvert[key]]);
    }
  }
  return convertedDto;
}

export function parseJSON(response) {
  return response.json();
}

export function getJson(endpoint: string) {
  return fetch(`${backend}${endpoint}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(checkStatus);
}

export function postJson(endpoint: string, params: Object, method = 'POST') {
  return fetch(`${backend}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
  }).then(checkStatus);
}

export function deleteJson(endpoint: string) {
  return fetch(`${backend}${endpoint}`, {
    method: 'DELETE',
  }).then(checkStatus);
}
