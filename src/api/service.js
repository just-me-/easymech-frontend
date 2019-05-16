import * as helper from './helper';

export const checkResponse = helper.checkResponse;

export type Material ={
    id?: number,
    stueckpreis?: string,
    anzahl?: number,
    bezeichnung?: string,
    serviceId?: number
}

export type Workstep = {
    id?: number,
    bezeichnung?: string,
    stundensatz?: string,
    arbeitsstunden?: string,
    serviceId?: number
}

export type Service = {
    id?: number,
    bezeichnung?: string,
    beginn?: string,
    ende?: string,
    maschinenId?: number,
    kundenId?: number,
    materialposten?: Array<Material>,
    arbeitsschritte?: Array<Workstep>
};


