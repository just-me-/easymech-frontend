// @flow

import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  Header, Table, Loader, Dimmer, Segment, Icon,
} from 'semantic-ui-react';

import * as customerCalls from '../shared/functions';
import './CustomerList.css';

import type { Customer } from '../../api/customer';

export type Props = {
  editCustomer: string => void,
  filterData: ?Customer,
};

function CustomerList(props: Props) {
  const [customerListData, setCustomerListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    customerCalls.getCustomers({
      filterData: props.filterData,
      loadingSetter: setIsLoading,
      dataSetter: setCustomerListData,
    });
  }, []);

  return (
    <div>
      <Header as="h1" textAlign="center">
        Gefundene Kunden
      </Header>

      <Table celled selectable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Firmenname</Table.HeaderCell>
            <Table.HeaderCell>Adresse</Table.HeaderCell>
            <Table.HeaderCell>PLZ</Table.HeaderCell>
            <Table.HeaderCell>Ort</Table.HeaderCell>
            <Table.HeaderCell>Vorname</Table.HeaderCell>
            <Table.HeaderCell>Nachname</Table.HeaderCell>
            <Table.HeaderCell>E-Mail</Table.HeaderCell>
            <Table.HeaderCell>Tel.</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(
            customerListData,
            ({
              id, firma, adresse, vorname, nachname, plz, ort, email, telefon,
            }, index) => (
              <Table.Row key={index}>
                <Table.Cell onClick={() => props.editCustomer(id)} className="Hover-effect link">
                  <Icon name="external" size="tiny" className="Inline-icon" />
                  {' '}
                  {firma}
                </Table.Cell>
                <Table.Cell>{adresse}</Table.Cell>
                <Table.Cell>{plz}</Table.Cell>
                <Table.Cell>{ort}</Table.Cell>
                <Table.Cell>{vorname}</Table.Cell>
                <Table.Cell>{nachname}</Table.Cell>
                <Table.Cell>
                  {email && (
                  <a href={`mailto:${email}`}>
                    <Icon name="mail" size="tiny" className="Inline-icon" />
                    {' '}
                    {email}
                  </a>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {telefon && (
                  <a href={`tel:${telefon}`}>
                    <Icon name="call" size="tiny" className="Inline-icon" />
                    {' '}
                    {telefon}
                  </a>
                  )}
                </Table.Cell>
              </Table.Row>
            ),
          )}
        </Table.Body>
      </Table>

      {isLoading && (
        <Segment>
          <Dimmer inverted active>
            <Loader inverted>Kunden werden geladen...</Loader>
          </Dimmer>
        </Segment>
      )}
    </div>
  );
}

export default CustomerList;
