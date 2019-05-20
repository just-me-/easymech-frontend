// @flow

import {NotificationManager} from 'react-notifications';
import * as apiCustomer from '../../api/customer';
import * as apiMachine from '../../api/machine';
import * as apiMachinetype from '../../api/machinetype';
import * as apiServiceSearch from '../../api/service_search';
import * as apiService from "../../api/service";
import * as apiTransaction from "../../api/transaction";
import * as rentalApi from "../../api/rental";

export function saveCustomer({
                                 formIsValid, customerData, setKey, setViewState = undefined,
                                 exists = false, // add or edit customer
                             }: any = {}) {
    const action = exists ? apiCustomer.updateCustomer : apiCustomer.addCustomer;
    if (formIsValid) {
        if (setViewState) setViewState('loader');
        action(customerData)
            .then((result) => {
                result = apiCustomer.checkResponse(result);
                NotificationManager.success(
                    'Der Kunde wurde erfolgreich gespeichert.',
                    `${result.firma} ${exists ? 'aktualisiert' : 'erfasst'}`,
                );
                if (setViewState) setViewState('list');
                if (setKey) setKey(Math.random()); // clear data - fresh form for next entry
            })
            .catch((error) => {
                console.log('Ups, ein Fehler ist aufgetreten', error);

                if (error.code && error.code > 0) {
                    NotificationManager.error(error.msg, error.codeMsg);
                } else {
                    NotificationManager.error(
                        'Beim Speichern des Kundens ist ein Fehler aufgetreten.',
                        'Bitte erneut versuchen!',
                    );
                }
            });
    } else {
        NotificationManager.info('Bitte überprüfen Sie Ihre Eingaben!');
    }
}

export function getCustomers({
                                 filterData, loadingSetter, dataSetter = undefined,
                                 deletedToo = false,
                             }: any = {}) {
    const action = deletedToo ? apiCustomer.getCustomers : apiCustomer.getFilteredCustomers;
    const param = deletedToo ? true : filterData;
    action(param)
        .then((result) => {
            result = apiCustomer.checkResponse(result);
            if (loadingSetter) loadingSetter(false);
            if (dataSetter) dataSetter(result);
        })
        .catch((error) => {
            console.log('Ups, ein Fehler ist aufgetreten', error);
            NotificationManager.error(
                'Kunden konnten nicht geladen werden',
                'Bitte überprüfen Sie Ihre Verbindung!',
            );
        });
}

export function getMachines({
                                filterData, loadingSetter, dataSetter = undefined,
                                deletedToo = false,
                            }: any = {}) {
    const action = deletedToo ? apiMachine.getMachines : apiMachine.getFilteredMachines;
    const param = deletedToo ? true : filterData;
    action(param)
        .then((result) => {
            result = apiMachine.checkResponse(result);
            if (loadingSetter) loadingSetter(false);
            if (dataSetter) dataSetter(result);
        })
        .catch((error) => {
            console.log('Ups, ein Fehler ist aufgetreten', error);
            NotificationManager.error(
                'Maschinen konnten nicht geladen werden',
                'Bitte überprüfen Sie Ihre Verbindung!',
            );
        });
}

export function getMachinetypes({
                                    filterData, loadingSetter, dataSetter = undefined,
                                }: any = {}) {
    const action = filterData
        ? apiMachinetype.getFilteredMachineTypes
        : apiMachinetype.getMachineTypes;
    action(filterData)
        .then((result) => {
            result = apiMachinetype.checkResponse(result);
            if (loadingSetter) loadingSetter(false);
            if (dataSetter) dataSetter(result);
        })
        .catch((error) => {
            console.log('Ups, ein Fehler ist aufgetreten', error);
            NotificationManager.error(
                'Maschinentypen konnten nicht geladen werden',
                'Bitte überprüfen Sie Ihre Verbindung!',
            );
        });
}

export function getServices({
                                type,
                                state = 'all',
                                filterData, loadingSetter, dataSetter = undefined,
                            }: any = {}) {
    let action;
    if (type === 'rentals') {
        action = apiServiceSearch.getRentals;
    } else if (type === 'transactions') {
        action = apiServiceSearch.getTransactions;
    } else if (type === 'services') {
        action = apiServiceSearch.getServices;
    } else {
        return null;
    }
    action(state, filterData)
        .then((result) => {
            result = apiServiceSearch.checkResponse(result);
            if (loadingSetter) loadingSetter(false);
            if (dataSetter) dataSetter(result);
        })
        .catch((error) => {
            console.log('Ups, ein Fehler ist aufgetreten', error);
            NotificationManager.error(
                'Dienstleistungen konnten nicht geladen werden',
                'Bitte überprüfen Sie Ihre Verbindung!',
            );
        });
}

export function getToday() {
    const today = new Date();
    return parseIsoDate(today.toISOString().substring(0, 10));
}

/* 2Do: sobald suche funktioniert und wir diese Funktion
   noch weiter brauchen auslagern... api oder validation */
function parseIsoDate(date) {
    if (date && date.length > 0) {
        const arr = date.match(/^(\d{4})-(\d{1,2})-(\d{1,2}).*/);
        date = arr && arr[1] && arr[2] && arr[3] ? `${arr[3]}.${arr[2]}.${arr[1]}` : '';
    }
    return date;
}

function errorHandler(error, setViewState) {
    console.log('Ups, ein Fehler ist aufgetreten', error);
    setViewState('edit');
    if (error.code && error.code > 0) {
        NotificationManager.error(error.msg, error.codeMsg);
    } else {
        NotificationManager.error(
            'Beim Speichern des Eintrags ist ein Fehler aufgetreten.',
            'Bitte erneut versuchen!',
        );
    }
}

function succesfulChange(result, setViewState) {
    result = apiService.checkResponse(result);
    setViewState('list');
    NotificationManager.success(
        'Der Eintrag wurde erfolgreich gespeichert.',
        `${result.id} aktualisiert`,
    );
}

export function saveEntry(formIsValid: boolean, setViewState: string => void, editType: any, editData: any) {
    if (formIsValid) {
        setViewState('loader');
        if (editType === 'service') {
            apiService
                .updateService(editData)
                .then((result) => {
                    succesfulChange(result, setViewState);
                })
                .catch((error) => {
                    errorHandler(error, setViewState);
                });
        } else if (editType === 'transaction') {
            apiTransaction
                .updateTransaction(editData)
                .then((result) => {
                    succesfulChange(result, setViewState)
                })
                .catch((error) => {
                    errorHandler(error, setViewState)
                })
        } else if (editType === 'rental') {
            console.log("Reservationsobejkt");
            console.log(editData);
            rentalApi
                .updateRental(editData)
                .then((result) => {
                    succesfulChange(result, setViewState)
                })
                .catch((error) => {
                    errorHandler(error, setViewState)
                })
        }
    } else {
        NotificationManager.info('Bitte überprüfen Sie Ihre Eingaben!');
    }
}