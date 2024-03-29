// @flow

import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  Header, Table, Loader, Dimmer, Segment, Icon, Message,
} from 'semantic-ui-react';

import * as serviceCalls from '../shared/functions';
import * as validation from '../shared/validation';

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

  function mapType(type) {
    if (type === 0) {
      return 'Verkauf';
    } if (type === 1) {
      return 'Ankauf';
    }
    return '';
  }

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

      {isLoading || transactionData.length > 0 ? (
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
                <Table.Cell>{validation.toCurrency(preis)}</Table.Cell>
                <Table.Cell>{mapType(typ)}</Table.Cell>
                <Table.Cell>{serviceCalls.parseIsoDate(datum)}</Table.Cell>
                <Table.Cell>{props.resolveCustomer(kundenId)}</Table.Cell>
                <Table.Cell>{props.resolveMachine(maschinenId)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <Message visible>Keine Transaktionen gefunden</Message>
      )}

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
