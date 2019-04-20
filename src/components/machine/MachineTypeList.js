// @flow

import _ from 'lodash'
import React, {useState, useEffect} from 'react'
import { Header, Table, Loader, Dimmer, Segment, Icon } from 'semantic-ui-react'


import type { Customer } from "../../api/customer";

export type Props = {
  editMachineType: (string) => void,
  filterData: ?Customer
};

function MachineTypList(props: Props) {

  const [machineTypeListData, setMachineTypeListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getMachineTypeListData() {
  /*api
    .getFilteredMachineTypes(props.filterData)
    .then((result) => {
      result = api.checkResponse(result);
      setIsLoading(false);
      setMachineTypeListData(result);
    })
    .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error));*/
  }

  useEffect(() => {
    getMachineTypeListData();
  }, []);

  return (
    <div>
      <Header as='h1' textAlign='center'>
        Gefundene Fahrzeugtypen
      </Header>

      <Table celled selectable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Fabrikat</Table.HeaderCell>
            <Table.HeaderCell>Motortyp</Table.HeaderCell>
            <Table.HeaderCell>Fahrzeughöhe</Table.HeaderCell>
            <Table.HeaderCell>Fahrzeuglänge</Table.HeaderCell>
            <Table.HeaderCell>Fahrzeugbreite</Table.HeaderCell>
            <Table.HeaderCell>Nutzlast</Table.HeaderCell>
            <Table.HeaderCell>Eigengewicht</Table.HeaderCell>
            <Table.HeaderCell>Hubkraft</Table.HeaderCell>
            <Table.HeaderCell>Hubhöhe</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(customerListData, ({ id, fabrikat, motortyp, fahrzeughoehe, fahrzeuglaenge, fahrzeugbreite, nutzlast, eigengewicht, hubkraft,hubhoehe, pneugroesse }, index) => (
            <Table.Row key={index}>
              <Table.Cell onClick={() => props.editMachineType(id)} className="Hover-effect link">
                <Icon name='external' size='tiny' className="Inline-icon"/> {fabrikat}
              </Table.Cell>
              <Table.Cell>{motortyp}</Table.Cell>
              <Table.Cell>{fahrzeughoehe}</Table.Cell>
              <Table.Cell>{fahrzeuglaenge}</Table.Cell>
              <Table.Cell>{fahrzeugbreite}</Table.Cell>
              <Table.Cell>{nutzlast}</Table.Cell>
              <Table.Cell>{eigengewicht}</Table.Cell>
              <Table.Cell>{hubkraft}</Table.Cell>
                <Table.Cell>{hubhoehe}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      { isLoading &&
        <Segment>
          <Dimmer inverted active>
            <Loader inverted>Fahrzeugtypen werden geladen...</Loader>
          </Dimmer>
        </Segment>
      }
    </div>
  )
}

export default CustomerList
