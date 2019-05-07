import { NotificationManager } from 'react-notifications';
import * as apiCustomer from '../../api/customer';
import * as apiMachinetype from '../../api/machinetype';

export function saveCustomer({
  formIsValid = undefined,
  customerData = undefined,
  setKey = undefined,
  setViewState = undefined,
  exists = false, // add or edit customer
} = {}) {
  const action = exists ? apiCustomer.updateCustomer : apiCustomer.addCustomer;
  if (formIsValid) {
    if (setViewState) setViewState('loader');
    action(customerData)
      .then((result) => {
        result = apiCustomer.checkResponse(result);
        NotificationManager.success(
          'Der Kunde wurde erfolgreich gespeichert.',
          `${result.firma}${exists ? 'aktualisiert' : 'erfasst'}`,
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
  filterData = undefined,
  loadingSetter = undefined,
  dataSetter = undefined,
  deletedToo = false,
} = {}) {
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

export function getMachinetypes({
  filterData = undefined,
  loadingSetter = undefined,
  dataSetter = undefined,
} = {}) {
  const action = filterData ? apiMachinetype.getFilteredMachineTypes : apiMachinetype.getMachineTypes;
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
