// @flow

import * as helper from "./helper";

export function addCustomer(customerObject): Promise<SaveResult> {
  return helper.postJson("/kunden", customerObject, "POST").then(helper.parseJSON);
}

export function updateCustomer(id: string, customerObject): Promise<SaveResult> {
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
