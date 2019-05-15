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
  const datetypes = ['von', 'bis'];
  return helper.convertToDatabaseDates(serviceSearchObject, datetypes);
}

function getServices(
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
  return helper.postJson(`/${type}`, prepareDto(searchDto), 'POST').then(helper.parseJSON);
}

export function getRentals(
  state: string,
  serviceSearchObject: ServiceSearchObject,
): Promise<{ result: Array<Rental> }> {
  return getServices('reservationen', state, serviceSearchObject);
}

export function getTransactions(
  state: string,
  serviceSearchObject: ServiceSearchObject,
): Promise<{ result: Array<Transaction> }> {
  return getServices('transaktionen', state, serviceSearchObject);
}

// 2Do: Type Services adden
export function getServices(
  state: string,
  serviceSearchObject: ServiceSearchObject,
): Promise<{ result: Array<any> }> {
  return getServices('service', state, serviceSearchObject);
}
