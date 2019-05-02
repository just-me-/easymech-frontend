import * as helper from "./helper";
export const checkResponse = helper.checkResponse;

export type Transaction = {
    id?: number,
    preis?: number,
    transactiontype?: number,
    datum?: string,
    maschinenid?: number,
    kundenid?: number
};

function prepareDto(transactionObject: Transaction) {
  const numbertypes = ['preis'];
  return helper.convertToNumbers(transactionObject, numbertypes);
}

export function addTransaction(transactionObject: Transaction): Promise<SaveResult> {
  return helper.postJson("/transaktionen/", prepareDto(machineObject), "POST").then(helper.parseJSON);
}

export function updateTransaction(transactionObject: Transaction): Promise<SaveResult> {
  return helper.postJson("/transaktionen/"+transactionObject.id, prepareDto(transactionObject), "PUT").then(helper.parseJSON);
}

export function deleteTransaction(id: string): Promise<SaveResult> {
  return helper.deleteJson("/transaktionen/"+id).then(helper.parseJSON);
}

export function getTransaction(id: string): Promise<Transaction> {
  return helper.getJson("/transaktionen/"+id).then(helper.parseJSON);
}

export function getTransactions(): Promise<{ result: Array<Transaction> }> {
  return helper.getJson("/transaktionen/").then(helper.parseJSON);
}

export function getFilteredTransactions(transactionObject: Transaction): Promise<{ result: Array<Transaction> }> {
  return helper.postJson("/transaktionen/suchen/", prepareDto(transactionObject), "POST").then(helper.parseJSON);
}
