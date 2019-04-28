// @flow

import _ from 'lodash'
import React, {useState, useEffect} from 'react'
import { Header, Table, Loader, Dimmer, Segment, Icon } from 'semantic-ui-react'

import * as api from "../../api/machine";

import type { Machine } from "../../api/machine";

export type Props = {
  editMachine: (string) => void,
  filterData: ?Machine
};

function MachineList(props: Props) {

  const [machineListData, setMachineListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getListData() {
  api
    .getFilteredMachines(props.filterData)
    .then((result) => {
      result = api.checkResponse(result);
      setIsLoading(false);
      setMachineListData(result);
    })
    .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error));
  }

  useEffect(() => {
    getListData();
  }, []);

  return (
    <div>
      <Header as='h1' textAlign='center'>
        Gefundene Maschienen
      </Header>

      <Table celled selectable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Seriennr.</Table.HeaderCell>
            <Table.HeaderCell>Mastnr.</Table.HeaderCell>
            <Table.HeaderCell>Motorennr.</Table.HeaderCell>
            <Table.HeaderCell>Betriebsdauer</Table.HeaderCell>
            <Table.HeaderCell>Jahrgang</Table.HeaderCell>
            <Table.HeaderCell>Besitzer</Table.HeaderCell>
            <Table.HeaderCell>Maschienentyp</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(machineListData, ({ id, seriennummer, mastnummer, motorennummer, betriebsdauer,
                                     jahrgang, besitzerId, fahrzeugTypId }, index) => (
            <Table.Row key={index}>
              <Table.Cell onClick={() => props.editMachine(id)} className="Hover-effect link">
                <Icon name='external' size='tiny' className="Inline-icon"/> {seriennummer}
              </Table.Cell>
              <Table.Cell>{mastnummer}</Table.Cell>
              <Table.Cell>{motorennummer}</Table.Cell>
              <Table.Cell>{betriebsdauer}</Table.Cell>
              <Table.Cell>{jahrgang}</Table.Cell>
              <Table.Cell>{besitzerId}</Table.Cell>
              <Table.Cell>{fahrzeugTypId}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      { isLoading &&
        <Segment>
          <Dimmer inverted active>
            <Loader inverted>Maschienen werden geladen...</Loader>
          </Dimmer>
        </Segment>
      }
    </div>
  )
}

export default MachineList
