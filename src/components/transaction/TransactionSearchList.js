// @flow

import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  Header, Table, Loader, Dimmer, Segment, Icon,
} from 'semantic-ui-react';

import * as serviceCalls from '../shared/functions';

export type Props = {
  editItem: (id: string, type: string, data: any) => void,
  filterData: any,
  resolveMachine: (id: number) => string,
  resolveCustomer: (id: number) => string,
  title: string,
};

function TransactionSearchList(props: Props) {
  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const baseParameters = {
      state: 'all',
      filterData: props.filterData,
      loadingSetter: setIsLoading,
    };

    if (props.filterData.searchTransaction) {
      serviceCalls.getServices({
        ...baseParameters,
        type: 'transactions',
        dataSetter: setTransactionData,
      });
    }
  }, []);

  return (
    <div>
      <Header as="h1" textAlign="center">
        {props.title}
      </Header>

      <Table celled selectable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Transaktionsnr.</Table.HeaderCell>
            <Table.HeaderCell>Preis</Table.HeaderCell>
            <Table.HeaderCell>Ankauf/Verkauf</Table.HeaderCell>
            <Table.HeaderCell>Datum</Table.HeaderCell>
            <Table.HeaderCell>Kunde</Table.HeaderCell>
            <Table.HeaderCell>Maschine</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(transactionData, ({
            id, preis, typ, datum, maschinenId, kundenId,
          }, index) => (
            <Table.Row key={index}>
              <Table.Cell
                onClick={() => props.editItem(id, 'transaction', transactionData[index])}
                className="Hover-effect link"
              >
                <Icon name="external" size="tiny" className="Inline-icon" />
                &nbsp;
                {id}
              </Table.Cell>
              <Table.Cell>{preis}</Table.Cell>
              <Table.Cell>{typ}</Table.Cell>
              <Table.Cell>{datum || ''}</Table.Cell>
              <Table.Cell>{props.resolveCustomer(kundenId)}</Table.Cell>
              <Table.Cell>{props.resolveMachine(maschinenId)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {isLoading && (
        <Segment>
          <Dimmer inverted active>
            <Loader inverted>Transaktionen werden geladen...</Loader>
          </Dimmer>
        </Segment>
      )}
    </div>
  );
}

export default TransactionSearchList;
