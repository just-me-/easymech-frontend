import * as helper from "./helper";
export const checkResponse = helper.checkResponse;

export type MachineType = {
  id?: string,
  fabrikat?: string,
  motortyp?: string,
  nutzlast?: number,
  hubkraft?: number,
  hubhoehe?: number,
  eigengewicht?: number,
  fahrzeughoehe?: number,
  fahrzeuglaenge?: number,
  fahrzeugbreite?: number,
  pneugroesse?: number
};

function prepareDto(machineTypeObject: MachineType) {
  const numbertypes = ['nutzlast', 'hubkraft', 'hubhoehe', 'eigengewicht', 'fahrzeughoehe',
                       'fahrzeuglaenge', 'fahrzeugbreite', 'pneugroesse'];
  return helper.convertToNumbers(machineTypeObject, numbertypes);
}

export function addMachineType(machineTypeObject: MachineType): Promise<SaveResult> {
  return helper.postJson("/fahrzeugtypen/", prepareDto(machineTypeObject), "POST").then(helper.parseJSON);
}

export function updateMachineType(machineTypeObject: MachineType): Promise<SaveResult> {
  return helper.postJson("/fahrzeugtypen/"+machineTypeObject.id, prepareDto(machineTypeObject), "PUT").then(helper.parseJSON);
}

export function deleteMachineType(id: string): Promise<SaveResult> {
  return helper.deleteJson("/fahrzeugtypen/"+id).then(helper.parseJSON);
}

export function getMachineType(id: string): Promise<MachineType> {
  return helper.getJson("/fahrzeugtypen/"+id).then(helper.parseJSON);
}

export function getMachineTypes(): Promise<{ result: Array<MachineType> }> {
  return helper.getJson("/fahrzeugtypen/").then(helper.parseJSON);
}

export function getFilteredMachineTypes(machineTypeObject: MachineType): Promise<{ result: Array<MachineType> }> {
  return helper.postJson("/fahrzeugtypen/suchen/", prepareDto(machineTypeObject), "POST").then(helper.parseJSON);
}
