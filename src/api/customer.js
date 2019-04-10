// @flow

import * as helper from "./helper";

// TMP: 2Do App Functions - no backend api yet...
/*
export function addCustomer(name: string): Promise<SaveResult> {
  return postJson("/kunden", {name}, "POST").then(parseJSON);
}
*/
/*
export function updateCustomer(id: string, name: string, isComplete: bool): Promise<SaveResult> {
  let task = {
    id: id, isComplete: isComplete, name: name
  }
  return postJson("/kunden/"+id, task, "PUT").then(parseJSON);
}
*/
/*
export function deleteCustomer(id: string): Promise<SaveResult> {
  return fetch(backend + '/kunden/' + id, {
    method: 'DELETE'
  })
  .then(parseJSON);
}
*/
export function addCustomer(
  firma: string,
  adresse: string,
  plz: string,
  ort: string,
  vorname: string,
  nachname: string,
  email: string,
  telefon: string,
  notiz: string
): Promise<SaveResult> {
  return helper.postJson("/kunden",
    {firma, adresse, plz, ort, vorname, nachname, email, telefon, notiz},
    "POST").then(helper.parseJSON);
}

export function getCustomer(id: string): Promise<Customer> {
  return helper.getJson(
    `/kunden/`+id
  ).then(helper.parseJSON);
}

export function getCustomers(): Promise<{ result: Array<Customer> }> {
  return helper.getJson(
    `/kunden`
  ).then(helper.parseJSON);
}
