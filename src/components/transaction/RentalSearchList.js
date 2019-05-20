// @flow

import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  Header, Table, Loader, Dimmer, Segment, Icon, Message,
} from 'semantic-ui-react';

import * as serviceCalls from '../shared/functions';

export type Props = {
  editItem?: (id: string, type: string, data: any) => void,
  filterData: any,
  resolveMachine: (id: number) => string,
  resolveCustomer: (id: number) => string,
  title?: string,
  searchState?: string,
};

function RentalSearchList(props: Props) {
  const [rentalData, setRentalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const baseParameters = {
      state: props.searchState || 'all',
      filterData: props.filterData,
      loadingSetter: setIsLoading,
    };

    if (props.filterData.searchRental) {
      serviceCalls.getServices({
        ...baseParameters,
        type: 'rentals',
        dataSetter: setRentalData,
      });
    }
  }, []);

  return (
    <div>
      {props.title && (
        <Header as="h1" textAlign="center">
          {props.title}
        </Header>
      )}

      {isLoading || rentalData.length > 0 ? (
        <Table celled selectable striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Reservationsnr.</Table.HeaderCell>
              <Table.HeaderCell>Standort</Table.HeaderCell>
              <Table.HeaderCell>Start</Table.HeaderCell>
              <Table.HeaderCell>Ende</Table.HeaderCell>
              <Table.HeaderCell>Maschine</Table.HeaderCell>
              <Table.HeaderCell>Kunde</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(
              rentalData,
              ({
                id, standort, startdatum, enddatum, maschinenId, kundenId,
              }, index) => (
                <Table.Row key={index}>
                  {props.editItem ? (
                    <Table.Cell
                      onClick={() => props.editItem && props.editItem(id, 'rental', rentalData[index])
                      }
                      className="Hover-effect link"
                    >
                      <Icon name="external" size="tiny" className="Inline-icon" />
                      &nbsp;
                      {id}
                    </Table.Cell>
                  ) : (
                    <Table.Cell>{id}</Table.Cell>
                  )}

                  <Table.Cell>{standort}</Table.Cell>
                  <Table.Cell>{startdatum}</Table.Cell>
                  <Table.Cell>{enddatum}</Table.Cell>
                  <Table.Cell>{props.resolveMachine(maschinenId)}</Table.Cell>
                  <Table.Cell>{props.resolveCustomer(kundenId)}</Table.Cell>
                </Table.Row>
              ),
            )}
          </Table.Body>
        </Table>
      ) : (
        <Message visible>Keine Reservationen gefunden</Message>
      )}

      {isLoading && (
        <Segment>
          <Dimmer inverted active>
            <Loader inverted>Reservationen werden geladen...</Loader>
          </Dimmer>
        </Segment>
      )}
    </div>
  );
}

export default RentalSearchList;
