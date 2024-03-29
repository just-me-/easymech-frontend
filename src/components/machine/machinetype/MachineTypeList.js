// @flow

import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  Table, Loader, Dimmer, Segment, Icon,
} from 'semantic-ui-react';

import * as machinetypeCalls from '../../shared/functions';

import type { MachineType } from '../../../api/machinetype';

export type Props = {
  editMachineType: string => void,
  filterData: ?MachineType,
};

function MachineTypeList(props: Props) {
  const [machineTypeListData, setMachineTypeListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    machinetypeCalls.getMachinetypes({
      filterData: props.filterData,
      loadingSetter: setIsLoading,
      dataSetter: setMachineTypeListData,
    });
  }, []);

  return (
    <div>
      <Table celled selectable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Fabrikat</Table.HeaderCell>
            <Table.HeaderCell>Motortyp</Table.HeaderCell>
            <Table.HeaderCell>Höhe [cm]</Table.HeaderCell>
            <Table.HeaderCell>Länge [cm]</Table.HeaderCell>
            <Table.HeaderCell>Breite [cm]</Table.HeaderCell>
            <Table.HeaderCell>Pneugrösse [cm]</Table.HeaderCell>
            <Table.HeaderCell>Nutzlast [kg]</Table.HeaderCell>
            <Table.HeaderCell>Gewicht [kg]</Table.HeaderCell>
            <Table.HeaderCell>Hubkraft [kg]</Table.HeaderCell>
            <Table.HeaderCell>Hubhöhe [cm]</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(
            machineTypeListData,
            (
              {
                id,
                fabrikat,
                motortyp,
                maschinenhoehe,
                maschinenlaenge,
                maschinenbreite,
                nutzlast,
                eigengewicht,
                hubkraft,
                hubhoehe,
                pneugroesse,
              },
              index,
            ) => (
              <Table.Row key={index}>
                <Table.Cell onClick={() => props.editMachineType(id)} className="Hover-effect link">
                  <Icon name="external" size="tiny" className="Inline-icon" />
                  &nbsp;
                  {fabrikat}
                </Table.Cell>
                <Table.Cell>{motortyp}</Table.Cell>
                <Table.Cell>{maschinenhoehe || ''}</Table.Cell>
                <Table.Cell>{maschinenlaenge || ''}</Table.Cell>
                <Table.Cell>{maschinenbreite || ''}</Table.Cell>
                <Table.Cell>{pneugroesse || ''}</Table.Cell>
                <Table.Cell>{nutzlast || ''}</Table.Cell>
                <Table.Cell>{eigengewicht || ''}</Table.Cell>
                <Table.Cell>{hubkraft || ''}</Table.Cell>
                <Table.Cell>{hubhoehe || ''}</Table.Cell>
              </Table.Row>
            ),
          )}
        </Table.Body>
      </Table>

      {isLoading && (
        <Segment>
          <Dimmer inverted active>
            <Loader inverted>Maschinentypen werden geladen...</Loader>
          </Dimmer>
        </Segment>
      )}
    </div>
  );
}

export default MachineTypeList;
