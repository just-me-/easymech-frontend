// @flow

import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  Header, Table, Loader, Dimmer, Segment, Icon,
} from 'semantic-ui-react';

import * as serviceCalls from '../shared/functions';

export type Props = {
  editEntry: (id: string, type: string) => void,
  filterData: ?any,
};

function ServiceList(props: Props) {
  const [rentalData, setRentalData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [serviceData, serServiceData] = useState([]);

  const [mergedData, setMergedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const baseParameters = {
      state: "all",
      filterData: props.filterData,
      loadingSetter: setIsLoading,
      dataSetter: setRentalData,
    };
    serviceCalls.getServices({
      ...baseParameters,
      type: "rentals",
    });
    serviceCalls.getServices({
      ...baseParameters,
      type: "transactions",
    });
    serviceCalls.getServices({
      ...baseParameters,
      type: "services",
    });
  }, []);

  useEffect(() => {
    const filteredArray = rentalData.map((entry) => {
      return {
        "id": entry.id,
        "startdatum": entry.startdatum,
        "enddatum": entry.enddatum,
        "maschinenid": entry.maschinenid,
        "kundenid": entry.kundenid,
        "type": "rental"
      };
    });
    setMergedData(_.concat(mergedData, filteredArray));
  }, [rentalData]);

  useEffect(() => {
    const filteredArray = rentalData.map((entry) => {
      return {
        "id": entry.id,
        "startdatum": entry.datum,
        "enddatum": "-",
        "maschinenid": entry.maschinenid,
        "kundenid": entry.kundenid,
        "type": "transaction"
      };
    });
    setMergedData(_.concat(mergedData, filteredArray));
  }, [transactionData]);

  useEffect(() => {
    const filteredArray = rentalData.map((entry) => {
      return {
        "id": entry.id,
        "startdatum": entry.startdatum,
        "enddatum": entry.enddatum,
        "maschinenid": entry.maschinenid,
        "kundenid": entry.kundenid,
        "type": "service"
      };
    });
    setMergedData(_.concat(mergedData, filteredArray));
  }, [serviceData]);

  return (
    <div>
      <Header as="h1" textAlign="center">
        Gefundene Dienstleistung
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
          {_.map(
            mergedData,
            ({
              id, type, startdatum, enddatum, maschinenid, kundenid
            }, index) => (
              <Table.Row key={index}>
                <Table.Cell onClick={() => props.editEntry(id, type)} className="Hover-effect link">
                  <Icon name="external" size="tiny" className="Inline-icon" />
                  &nbsp;
                  {type}
                </Table.Cell>
                <Table.Cell>{startdatum}</Table.Cell>
                <Table.Cell>{enddatum}</Table.Cell>
                <Table.Cell>{maschinenid}</Table.Cell>
                <Table.Cell>{kundenid}</Table.Cell>
              </Table.Row>
            ),
          )}
        </Table.Body>
      </Table>

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
