// @flow

import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  Header, Table, Loader, Dimmer, Segment, Icon,
} from 'semantic-ui-react';

import * as sharedCalls from '../shared/functions';

import type { Machine } from '../../api/machine';

export type Props = {
  editMachine: string => void,
  filterData: ?Machine,
};

function MachineList(props: Props) {
  const [machineListData, setMachineListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [machineTypeData, setMachineTypeData] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  function getCustomerText(id) {
    if (id) {
      const customer = customerData.find(x => x.id === id);
      if (customer) {
        return customer.firma;
      }
      return 'Nicht gefunden';
    }
    return 'Kein Besitzer hinterlegt';
  }

  function getMachineTypeText(id) {
    if (id) {
      const machineType = machineTypeData.find(x => x.id === id);
      if (machineType) {
        return machineType.fabrikat;
      }
      return 'Nicht gefunden';
    }
    return 'Kein Typ hinterlegt';
  }

  useEffect(() => {
    sharedCalls.getMachines({
      filterData: props.filterData,
      loadingSetter: setIsLoading,
      dataSetter: setMachineListData,
    });
    sharedCalls.getCustomers({
      deletedToo: true,
      dataSetter: setCustomerData,
    });
    sharedCalls.getMachinetypes({
      dataSetter: setMachineTypeData,
    });
  }, []);

  return (
    <div>
      <Header as="h1" textAlign="center">
        Gefundene Maschinen
      </Header>

      <Table celled selectable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Seriennr.</Table.HeaderCell>
            <Table.HeaderCell>Mastnr.</Table.HeaderCell>
            <Table.HeaderCell>Motorennr.</Table.HeaderCell>
            <Table.HeaderCell>Betriebsdauer [Stunden]</Table.HeaderCell>
            <Table.HeaderCell>Jahrgang</Table.HeaderCell>
            <Table.HeaderCell>Besitzer</Table.HeaderCell>
            <Table.HeaderCell>Maschinentyp</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(
            machineListData,
            (
              {
                id,
                seriennummer,
                mastnummer,
                motorennummer,
                betriebsdauer,
                jahrgang,
                besitzerId,
                maschinentypId,
              },
              index,
            ) => (
              <Table.Row key={index}>
                <Table.Cell onClick={() => props.editMachine(id)} className="Hover-effect link">
                  <Icon name="external" size="tiny" className="Inline-icon" />
                  {' '}
                  {seriennummer}
                </Table.Cell>
                <Table.Cell>{mastnummer}</Table.Cell>
                <Table.Cell>{motorennummer}</Table.Cell>
                <Table.Cell>{betriebsdauer || ''}</Table.Cell>
                <Table.Cell>{jahrgang || ''}</Table.Cell>
                <Table.Cell>{getCustomerText(besitzerId)}</Table.Cell>
                <Table.Cell>{getMachineTypeText(maschinentypId)}</Table.Cell>
              </Table.Row>
            ),
          )}
        </Table.Body>
      </Table>

      {isLoading && (
        <Segment>
          <Dimmer inverted active>
            <Loader inverted>Maschinen werden geladen...</Loader>
          </Dimmer>
        </Segment>
      )}
    </div>
  );
}

export default MachineList;
