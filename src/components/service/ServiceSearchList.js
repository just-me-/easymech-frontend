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

function ServiceSearchList(props: Props) {
  const [serviceData, setServiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const baseParameters = {
      state: props.searchState || 'all',
      filterData: props.filterData,
      loadingSetter: setIsLoading,
    };

    if (props.filterData.searchService) {
      serviceCalls.getServices({
        ...baseParameters,
        type: 'services',
        dataSetter: setServiceData,
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

      {isLoading || serviceData.length > 0 ? (
        <Table celled selectable striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Servicenr.</Table.HeaderCell>
              <Table.HeaderCell>Bezeichnung</Table.HeaderCell>
              <Table.HeaderCell>Beginn</Table.HeaderCell>
              <Table.HeaderCell>Ende</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Kunde</Table.HeaderCell>
              <Table.HeaderCell>Maschine</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(
              serviceData,
              ({
                id, bezeichnung, beginn, ende, status, maschinenId, kundenId,
              }, index) => (
                <Table.Row key={index}>
                  {props.editItem ? (
                    <Table.Cell
                      onClick={() => props.editItem && props.editItem(id, 'service', serviceData[index])
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
                  <Table.Cell>{bezeichnung}</Table.Cell>
                  <Table.Cell>{beginn || ''}</Table.Cell>
                  <Table.Cell>{ende || ''}</Table.Cell>
                  <Table.Cell>{status || ''}</Table.Cell>
                  <Table.Cell>{props.resolveCustomer(kundenId)}</Table.Cell>
                  <Table.Cell>{props.resolveMachine(maschinenId)}</Table.Cell>
                </Table.Row>
              ),
            )}
          </Table.Body>
        </Table>
      ) : (
        <Message visible>Keine Services gefunden</Message>
      )}

      {isLoading && (
        <Segment>
          <Dimmer inverted active>
            <Loader inverted>Services werden geladen...</Loader>
          </Dimmer>
        </Segment>
      )}
    </div>
  );
}

export default ServiceSearchList;
