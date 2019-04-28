// @flow

import _ from 'lodash'
import React, {useState, useEffect} from 'react'
import { Table, Loader, Dimmer, Segment, Icon } from 'semantic-ui-react'

import * as api from "../../../api/machinetype"
import type { MachineType } from "../../../api/machinetype";

export type Props = {
  editMachineType: (string) => void,
  filterData: ?MachineType
};

function MachineTypeList(props: Props) {

  const [machineTypeListData, setMachineTypeListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getMachineTypeListData() {
    console.log(props.filterData);
    api
      .getFilteredMachineTypes(props.filterData)
      .then((result) => {
        result = api.checkResponse(result);
        setIsLoading(false);
        setMachineTypeListData(result);
      })
      .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error));
  }

  useEffect(() => {
    getMachineTypeListData();
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
          {_.map(machineTypeListData, ({ id, fabrikat, motortyp, fahrzeughoehe, fahrzeuglaenge, fahrzeugbreite,
                                           nutzlast, eigengewicht, hubkraft,hubhoehe, pneugroesse }, index) => (
            <Table.Row key={index}>
              <Table.Cell onClick={() => props.editMachineType(id)} className="Hover-effect link">
                <Icon name='external' size='tiny' className="Inline-icon"/> {fabrikat}
              </Table.Cell>
              <Table.Cell>{motortyp}</Table.Cell>
              <Table.Cell>{fahrzeughoehe || ""}</Table.Cell>
              <Table.Cell>{fahrzeuglaenge || ""}</Table.Cell>
              <Table.Cell>{fahrzeugbreite || ""}</Table.Cell>
              <Table.Cell>{pneugroesse || ""}</Table.Cell>
              <Table.Cell>{nutzlast || ""}</Table.Cell>
              <Table.Cell>{eigengewicht || ""}</Table.Cell>
              <Table.Cell>{hubkraft || ""}</Table.Cell>
              <Table.Cell>{hubhoehe || ""}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      { isLoading &&
        <Segment>
          <Dimmer inverted active>
            <Loader inverted>Maschienentypen werden geladen...</Loader>
          </Dimmer>
        </Segment>
      }
    </div>
  )
}

export default MachineTypeList
