import * as helper from './helper';
import type {Rental} from "./rental";

export const checkResponse = helper.checkResponse;

export type Material = {
  bezeichnung?: string,
  preis?: number,
  anzahl?: number,
};

export type WorkStep = {
  bezeichnung?: string,
  stundensatz?: number,
  dauer?: number,
};

export type Service = {
  id?: number,
  bezeichnung?: string,
  beginn?: string,
  ende?: string,
  status?: number,
  maschinenId?: number,
  kundenId?: number,
  materialposten?: Array<Material>,
  arbeitsschritte?: Array<WorkStep>,
};

function prepareDto(serviceObject: Service) {
  const dateTypes = ['beginn', 'ende'];
  let service = JSON.parse(JSON.stringify(serviceObject));
  service = helper.convertToDatabaseDates(service, dateTypes);
  service.materialposten.forEach(el => {
    console.log("material", el);
  })
  service.arbeitsschritte.forEach(el => {
    console.log("schritt", el); 
  })
  return service;
}

export function addService(serviceObject: Service): Promise<SaveResult> {
  return helper.postJson('/services/', prepareDto(serviceObject), 'POST').then(helper.parseJSON);
}

export function updateService(serviceObject: Service): Promise<SaveResult> {
  return helper
    .postJson(`/services/${serviceObject.id}`, prepareDto(serviceObject), 'PUT')
    .then(helper.parseJSON);
}

export function updateRental(rentalObject: Rental): Promise<SaveResult> {
    return helper
        .postJson(`/reservationen/${rentalObject.id}`, prepareDto(rentalObject), 'PUT')
        .then(helper.parseJSON);
}

export function deleteService(id: string): Promise<SaveResult> {
  return helper.deleteJson(`/services/${id}`).then(helper.parseJSON);
}

/* not sure if  needed - in case of no usage -> could be deleted */
export function getService(id: string): Promise<Service> {
  return helper.getJson(`/services/${id}`).then(helper.parseJSON);
}

export function getServices(): Promise<{ result: Array<Service> }> {
  return helper.getJson('/services/').then(helper.parseJSON);
}
