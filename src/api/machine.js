import * as helper from "./helper";
export const checkResponse = helper.checkResponse;

export type Machine = {
    id?: string,
    seriennummer?: string,
    mastnummer?: string,
    motorennummer?: string,
    notiz?: string,
    betriebsdauer?: number,
    jahrgang?: number,
    isActive?: boolean,
    besitzerId?: number,
    fahrzeugTypId?: number
};

function prepareDto(machineObject: Machine) {
  let dto = machineObject;
  const numbertypes = ['betriebsdauer', 'jahrgang', 'besitzerId', 'fahrzeugTypId'];
  for (const key in numbertypes) {
    let convertedNumber = parseInt(dto[numbertypes[key]], 10);
    if (isNaN(convertedNumber))
      convertedNumber = 0;
    dto[numbertypes[key]] = convertedNumber;
  }
  return dto;
}

export function addMachine(machineObject: Machine): Promise<SaveResult> {
  return helper.postJson("/maschinen/", prepareDto(machineObject), "POST").then(helper.parseJSON);
}

export function updateMachine(machineObject: Machine): Promise<SaveResult> {
  return helper.postJson("/maschinen/"+machineObject.id, prepareDto(machineObject), "PUT").then(helper.parseJSON);
}

export function deleteMachine(id: string): Promise<SaveResult> {
  return helper.deleteJson("/maschinen/"+id).then(helper.parseJSON);
}

export function getMachine(id: string): Promise<Machine> {
  return helper.getJson("/maschinen/"+id).then(helper.parseJSON);
}

export function getMachines(): Promise<{ result: Array<Machine> }> {
  return helper.getJson("/maschinen/").then(helper.parseJSON);
}

export function getFilteredMachines(machineObject: Machine): Promise<{ result: Array<Machine> }> {
  return helper.postJson("/maschinen/suchen/", prepareDto(machineObject), "POST").then(helper.parseJSON);
}
