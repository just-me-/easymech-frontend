import * as helper from "./helper";
export const checkResponse = helper.checkResponse;

export type Machine = {
    id?: string,
    seriennummer?: string,
    mastnummer?: string,
    motorennummer?: string,
    betriebsdauer?: number,
    jahrgang?: number,
    notiz?: string,
    isActive?: boolean
};

export function addMachine(machineObject: Machine): Promise<SaveResult> {
  return helper.postJson("/maschinen/", machineObject, "POST").then(helper.parseJSON);
}

export function updateMachine(machineObject: Machine): Promise<SaveResult> {
  return helper.postJson("/maschinen/"+machineObject.id, machineObject, "PUT").then(helper.parseJSON);
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
  return helper.postJson("/maschinen/suchen/", machineObject, "POST").then(helper.parseJSON);
}