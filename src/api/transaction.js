import * as helper from './helper';

export const checkResponse = helper.checkResponse;

export type Rental = {
  id?: string,
  standort?: string,
  startdatum?: string, // date
  enddatum?: string, // date
  maschinenId?: number,
  kundenId?: number,
  uebergabe?: {
    datum: string, // date
    notiz?: string,
  },
  ruecknahme?: {
    datum: string, // date
    notiz?: string,
  },
};


// 2Do: wir brauchen noch ein converte to date :)
// const datetypes = ['startdatum', 'enddatum', 'uebergabe.datum', 'ruecknahme.datum'];
function prepareDto(rentalObject: Rental) {
  const numbertypes = ['betriebsdauer', 'jahrgang', 'besitzerId', 'maschinentypId'];
  return helper.convertToNumbers(rentalObject, numbertypes);
}

export function addRental(rentalObject: Rental): Promise<SaveResult> {
  return helper.postJson('/reservationen/', prepareDto(rentalObject), 'POST').then(helper.parseJSON);
}

export function updateRental(rentalObject: Rental): Promise<SaveResult> {
  return helper
    .postJson(`/reservationen/${rentalObject.id}`, prepareDto(rentalObject), 'PUT')
    .then(helper.parseJSON);
}

export function deleteRental(id: string): Promise<SaveResult> {
  return helper.deleteJson(`/reservationen/${id}`).then(helper.parseJSON);
}

export function getRental(id: string): Promise<Rental> {
  return helper.getJson(`/reservationen/${id}`).then(helper.parseJSON);
}

export function getRentals(): Promise<{ result: Array<Rental> }> {
  return helper.getJson('/reservationen/').then(helper.parseJSON);
}
