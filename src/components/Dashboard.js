// @flow

import React, { useState, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import * as sharedCalls from './shared/functions';

import ServiceSearchList from './service/ServiceSearchList';
import RentalSearchList from './transaction/RentalSearchList';

function Dashboard() {
  const [machineData, setMachineData] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  const dateFilter = {
    beginn: sharedCalls.getToday(-1),
    ende: sharedCalls.getToday(10),
  };

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

  useEffect(() => {
    sharedCalls.getCustomers({
      deletedToo: true,
      dataSetter: setCustomerData,
    });

    sharedCalls.getMachines({
      deletedToo: true,
      dataSetter: setMachineData,
    });
  }, []);

  return (
    <React.Fragment>
      <Header as="h1" textAlign="center">
        Aktuelles in der Übersicht
      </Header>

      <Header as="h2">Anstehende Reparaturen und Servicearbeiten</Header>
      <ServiceSearchList
        filterData={{ ...dateFilter, searchService: true }}
        resolveCustomer={getCustomerText}
        resolveMachine={getMachineText}
        searchState="pending"
      />

      <Header as="h2">Laufende Reparaturen und Servicearbeiten</Header>
      <ServiceSearchList
        filterData={{ ...dateFilter, searchService: true }}
        resolveCustomer={getCustomerText}
        resolveMachine={getMachineText}
        searchState="running"
      />

      <Header as="h2">Aktuelle Vermietungen - ausgehende Maschinen</Header>
      <RentalSearchList
        filterData={{ ...dateFilter, searchRental: true }}
        resolveCustomer={getCustomerText}
        resolveMachine={getMachineText}
        searchState="pending"
      />

      <Header as="h2">Aktuelle Vermitungen - eingehende Maschinen</Header>
      <RentalSearchList
        filterData={{ ...dateFilter, searchRental: true }}
        resolveCustomer={getCustomerText}
        resolveMachine={getMachineText}
        searchState="running"
      />
    </React.Fragment>
  );
}

export default Dashboard;
