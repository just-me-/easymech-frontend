// @flow

import * as helper from "./helper";

export type Customer = {
  firma: string,
  adresse: string,
  plz: string,
  ort: string,
  vorname: string,
  nachname: string,
  email: string,
  telefon: string,
  notiz: string
};

export function addCustomer(customerObject: Customer): Promise<SaveResult> {
  return helper.postJson("/kunden", customerObject, "POST").then(helper.parseJSON);
}

export function updateCustomer(id: string, customerObject: Customer): Promise<SaveResult> {
  return helper.postJson("/kunden/"+id, customerObject, "PUT").then(helper.parseJSON);
}

export function deleteCustomer(id: string): Promise<SaveResult> {
  return helper.deleteJson("/kunden/"+id).then(helper.parseJSON);
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
