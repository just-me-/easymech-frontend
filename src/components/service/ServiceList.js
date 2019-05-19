// @flow

import React, { useState, useEffect } from 'react';

import * as serviceCalls from '../shared/functions';
import ServiceSearchList from "./ServiceSearchList";
import TransactionSearchList from "../transaction/TransactionSearchList";
import RentalSearchList from "../transaction/RentalSearchList";

export type Props = {
  editEntry: (id: string, type: string) => void,
  filterData: ?any,
};

function ServiceList(props: Props) {
  const [machineData, setMachineData] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
      serviceCalls.getCustomers({
          deletedToo: true,
          dataSetter: setCustomerData,
      });

     serviceCalls.getMachines({
          deletedToo: true,
          dataSetter: setMachineData,
      });
  }, []);

  function getCustomerText(id: number) {
      if (id) {
          const customer = customerData.find(x => x.id === id);
          if (customer) {
              return customer.firma;
          }
          return 'Nicht gefunden';
      }
      return 'Kunde hinterlegt';
  }

  function getMachineText(id: number) {
      if (id) {
          const machine = machineData.find(x => x.id === id);
          if (machine) {
              return machine.seriennummer;
          }
          return 'Nicht gefunden';
      }
      return 'Keine Maschine hinterlegt';
  }

  function onEditItem(itemId, type) {
      console.log("2do - " + itemId + " Type: " + type);
  }

  return (
    <div>
      <ServiceSearchList
          editItem={onEditItem}
          filterData={props.filterData}
          resolveCustomer={getCustomerText}
          resolveMachine={getMachineText}
      />
      <TransactionSearchList
          editItem={onEditItem}
          filterData={props.filterData}
          resolveCustomer={getCustomerText}
          resolveMachine={getMachineText}
      />
      <RentalSearchList
          editItem={onEditItem}
          filterData={props.filterData}
          resolveCustomer={getCustomerText}
          resolveMachine={getMachineText}
      />
    </div>
  );
}
export default ServiceList;
