import * as api from '../../api/customer';

export function getCustomers({
  filterData = undefined,
  loadingSetter = undefined,
  dataSetter = undefined,
  fix = undefined,
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
