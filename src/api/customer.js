import * as helper from './helper';
export const checkResponse = helper.checkResponse;

export type Customer = {
  id?: string,
  firma?: string,
  adresse?: string,
  plz?: string,
  ort?: string,
  vorname?: string,
  nachname?: string,
  email?: string,
  telefon?: string,
  notiz?: string,
};

export function addCustomer(customerObject: Customer): Promise<SaveResult> {
  return helper.postJson('/kunden', customerObject, 'POST').then(helper.parseJSON);
}

export function updateCustomer(customerObject: Customer): Promise<SaveResult> {
  return helper
    .postJson('/kunden/' + customerObject.id, customerObject, 'PUT')
    .then(helper.parseJSON);
}

export function deleteCustomer(id: string): Promise<SaveResult> {
  return helper.deleteJson('/kunden/' + id).then(helper.parseJSON);
}

export function getCustomer(id: string): Promise<Customer> {
  return helper.getJson('/kunden/' + id).then(helper.parseJSON);
}

export function getCustomers(deletedToo: boolean = false): Promise<{ result: Array<Customer> }> {
  return helper.getJson('/kunden/' + (deletedToo ? 'all' : '')).then(helper.parseJSON);
}

export function getFilteredCustomers(
  customerObject: Customer,
): Promise<{ result: Array<Customer> }> {
  return helper.postJson('/kunden/suchen', customerObject, 'POST').then(helper.parseJSON);
}
