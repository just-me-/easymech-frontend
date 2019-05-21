import * as helper from './helper';

export const checkResponse = helper.checkResponse;

export type Transaction = {
  id?: number,
  preis?: number,
  transactiontype?: number,
  datum?: string,
  maschinenid?: number,
  kundenid?: number,
};

function prepareDto(transactionObject: Transaction) {
  const datetypes = ['datum'];
  const numbertypes = ['preis'];
  // deep copy 2 prevent side effects
  let transaction = JSON.parse(JSON.stringify(transactionObject));
  transaction = helper.convertToNumbers(transactionObject, numbertypes);
  return helper.convertToDatabaseDates(transaction, datetypes);
}

export function addTransaction(transactionObject: Transaction): Promise<SaveResult> {
  return helper
    .postJson('/transaktionen/', prepareDto(transactionObject), 'POST')
    .then(helper.parseJSON);
}

export function updateTransaction(transactionObject: Transaction): Promise<SaveResult> {
  return helper
    .postJson(`/transaktionen/${transactionObject.id}`, prepareDto(transactionObject), 'PUT')
    .then(helper.parseJSON);
}

export function getTransaction(id: string): Promise<Transaction> {
  return helper.getJson(`/transaktionen/${id}`).then(helper.parseJSON);
}

export function getTransactions(): Promise<{ result: Array<Transaction> }> {
  return helper.getJson('/transaktionen/').then(helper.parseJSON);
}

export function getFilteredTransactions(
  transactionObject: Transaction,
): Promise<{ result: Array<Transaction> }> {
  return helper
    .postJson('/transaktionen/suchen/', prepareDto(transactionObject), 'POST')
    .then(helper.parseJSON);
}
