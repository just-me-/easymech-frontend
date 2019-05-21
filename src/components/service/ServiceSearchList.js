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

  function mapStatus(status) {
    if (status === 0) {
      return 'geplant';
    } if (status === 1) {
      return 'wird bearbeitet';
    } if (status === 2) {
      return 'abgeschlossen';
    }
    return '';
  }

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
                  <Table.Cell>{serviceCalls.parseIsoDate(beginn)}</Table.Cell>
                  <Table.Cell>{serviceCalls.parseIsoDate(ende)}</Table.Cell>
                  <Table.Cell>{mapStatus(status)}</Table.Cell>
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
