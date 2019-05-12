import * as helper from './helper';

export const checkResponse = helper.checkResponse;

export type Rental = {
  id?: string,
  standort?: string,
  startdatum?: string,
  enddatum?: string,
  maschinenId?: number,
  kundenId?: number,
  uebergabe?: {
    datum: string,
    notiz?: string,
  },
  ruecknahme?: {
    datum: string,
    notiz?: string,
  },
};

function deleteSubObjectIfDateEmtpy(object: string, rentalObject: Rental) {
  if (rentalObject[object].datum === '') {
    rentalObject = { ...rentalObject, [object]: null };
  }
  return rentalObject;
}

function prepareDto(rentalObject: Rental) {
  const datetypes = ['startdatum', 'enddatum', 'uebergabe.datum', 'ruecknahme.datum'];
  let rental = helper.convertToDatabaseDates(rentalObject, datetypes);
  rental = deleteSubObjectIfDateEmtpy('uebergabe', rental);
  return deleteSubObjectIfDateEmtpy('ruecknahme', rental);
}

export function addRental(rentalObject: Rental): Promise<SaveResult> {
  return helper
    .postJson('/reservationen/', prepareDto(rentalObject), 'POST')
    .then(helper.parseJSON);
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
