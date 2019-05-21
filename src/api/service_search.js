import * as helper from './helper';

import type { Rental } from '../../api/rental';
import type { Transaction } from '../../api/transaction';

export const checkResponse = helper.checkResponse;

export type ServiceSearchObject = {
  von?: string,
  bis?: string,
  maschinenId?: number,
  maschinentypId?: number,
  kundenId?: number,
  status?: number,
};

function prepareDto(serviceSearchObject: ServiceSearchObject) {
  const numbertypes = ['kundenId', 'maschinenId', 'maschinentypId'];
  const datetypes = ['beginn', 'ende'];
  let object = Object.assign({}, serviceSearchObject);
  object = helper.convertToNumbers(object, numbertypes);
  return helper.convertToDatabaseDates(object, datetypes);
}

function getAllTypesOfServices(
  type: string = 'all',
  state: string = 'all',
  serviceSearchObject: ServiceSearchObject,
): Promise<{ result: Array<any> }> {
  const states = {
    all: 0,
    pending: 1,
    running: 2,
    completed: 3,
  };
  const searchDto = Object.assign({ status: states[state] }, serviceSearchObject);
  return helper.postJson(`/${type}/suchen`, prepareDto(searchDto), 'POST').then(helper.parseJSON);
}

export function getRentals(
  state: string,
  serviceSearchObject: ServiceSearchObject,
): Promise<{ result: Array<Rental> }> {
  return getAllTypesOfServices('reservationen', state, serviceSearchObject);
}

export function getTransactions(
  state: string,
  serviceSearchObject: ServiceSearchObject,
): Promise<{ result: Array<Transaction> }> {
  return getAllTypesOfServices('transaktionen', state, serviceSearchObject);
}

export function getServices(
  state: string,
  serviceSearchObject: ServiceSearchObject,
): Promise<{ result: Array<Service> }> {
  return getAllTypesOfServices('services', state, serviceSearchObject);
}
