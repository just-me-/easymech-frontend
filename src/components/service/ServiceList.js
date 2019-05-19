// @flow

import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  Header, Table, Loader, Dimmer, Segment, Icon,
} from 'semantic-ui-react';

import * as serviceCalls from '../shared/functions';
import ServiceSearchList from "./ServiceSearchList";

export type Props = {
  editEntry: (id: string, type: string) => void,
  filterData: ?any,
};

function ServiceList(props: Props) {
  const [rentalData, setRentalData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [serviceData, setServiceData] = useState([]);

  const [mergedData, setMergedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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


  useEffect(() => {
    const baseParameters = {
      state: 'all',
      filterData: props.filterData,
      loadingSetter: setIsLoading,
    };
    if(props.filterData.searchRental){
        serviceCalls.getServices({
            ...baseParameters,
            type: 'rentals',
            dataSetter: setRentalData,
        });
    }
    if(props.filterData.searchTransaction){
        serviceCalls.getServices({
            ...baseParameters,
            type: 'transactions',
            dataSetter: setTransactionData,
        });
    }
    if(props.filterData.searchService){
        serviceCalls.getServices({
            ...baseParameters,
            type: 'services',
            dataSetter: setServiceData,
        });
    }
  }, []);

  useEffect(
    () => {
      const filteredArray = rentalData.map(entry => ({
        id: entry.id,
        startdatum: entry.startdatum,
        enddatum: entry.enddatum,
        maschinenid: entry.maschinenid,
        kundenid: entry.kundenid,
        type: 'rental',
      }));
      setMergedData(_.concat(mergedData, filteredArray));
    },
    [rentalData],
  );

  useEffect(
    () => {
      const filteredArray = rentalData.map(entry => ({
        id: entry.id,
        startdatum: entry.datum,
        enddatum: '-',
        maschinenid: entry.maschinenid,
        kundenid: entry.kundenid,
        type: 'transaction',
      }));
      setMergedData(_.concat(mergedData, filteredArray));
    },
    [transactionData],
  );

  useEffect(
    () => {
      const filteredArray = rentalData.map(entry => ({
        id: entry.id,
        startdatum: entry.startdatum,
        enddatum: entry.enddatum,
        maschinenId: entry.maschinenId,
        kundenId: entry.kundenId,
        type: 'service',
      }));
      setMergedData(_.concat(mergedData, filteredArray));
    },
    [serviceData],
  );


  function onEditItem(itemId, type) {
      console.log("2do - " + itemId + " Type: " + type);
  }

  return (
    <div>
      <Header as="h1" textAlign="center">
        Gefundene Dienstleistungen / Transaktionen
      </Header>

      <Table celled selectable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Typ</Table.HeaderCell>
            <Table.HeaderCell>Startdatum</Table.HeaderCell>
            <Table.HeaderCell>Enddatum</Table.HeaderCell>
            <Table.HeaderCell>Maschine</Table.HeaderCell>
            <Table.HeaderCell>Kunde</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(mergedData, ({
            id, type, startdatum, enddatum, maschinenId, kundenId,
          }, index) => (
            <Table.Row key={index}>
              <Table.Cell onClick={() => props.editEntry(id, type)} className="Hover-effect link">
                <Icon name="external" size="tiny" className="Inline-icon" />
                &nbsp;
                {type}
              </Table.Cell>
              <Table.Cell>{startdatum}</Table.Cell>
              <Table.Cell>{enddatum}</Table.Cell>
              <Table.Cell>{maschinenId}</Table.Cell>
              <Table.Cell>{kundenId}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <ServiceSearchList editItem={onEditItem} filterData={props.filterData}
                         resolveCustomer={getCustomerText} resolveMachine={getMachineText}/>

      {isLoading && (
        <Segment>
          <Dimmer inverted active>
            <Loader inverted>Dienstleistungen werden geladen...</Loader>
          </Dimmer>
        </Segment>
      )}
    </div>
  );
}

export default ServiceList;
