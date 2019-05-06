import { NotificationManager } from 'react-notifications';
import * as api from '../../api/customer';

export function addCustomer({
  formIsValid = undefined,
  customerData = undefined,
  keySetter = undefined,
  setViewState = undefined,
} = {}) {
  const action = true ? api.addCustomer : api.editCustomer;
  if (formIsValid) {
    action(customerData)
      .then((result) => {
        result = api.checkResponse(result);
        NotificationManager.success(
          'Der Kunde wurde erfolgreich gespeichert.',
          `${result.firma} erfasst`,
        );
        keySetter(Math.random()); // clear data - fresh form for next entry
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

export function updateCustomer({
  formIsValid = undefined,
  customerData = undefined,
  keySetter = undefined,
  setViewState = undefined,
} = {}) {
  if (formIsValid) {
    setViewState('loader');
    api
      .updateCustomer(customerData)
      .then((result) => {
        result = api.checkResponse(result);
        setViewState('list');
        NotificationManager.success(
          'Der Kunde wurde erfolgreich gespeichert.',
          `${result.firma} aktualisiert`,
        );
      })
      .catch((error) => {
        console.log('Ups, ein Fehler ist aufgetreten', error);
        setViewState('edit');
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
} = {}) {
  api
    .getFilteredCustomers(filterData)
    .then((result) => {
      result = api.checkResponse(result);
      loadingSetter(false);
      dataSetter(result);
    })
    .catch(error => console.log('Ups, ein Fehler ist aufgetreten', error));
}
