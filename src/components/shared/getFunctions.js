import * as api from '../../api/customer';

// CustomrList => get all customers
export function getCustomers({
  filterData = undefined,
  loadingSetter =  undefined,
  dataSetter =  undefined,
  fix=undefined
}={}) {
  console.log("There", filterData, loadingSetter, dataSetter, fix);
  /*
    api
      .getFilteredCustomers(filterData)
      .then((result) => {
        result = api.checkResponse(result);
        loadingSetter(false);
        dataSetter(result);
      })
      .catch(error => console.log('Ups, ein Fehler ist aufgetreten', error));*/
}
