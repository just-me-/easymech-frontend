// @flow

import _ from "lodash";
import React, { useState, useEffect } from "react";
import {
  Header,
  Table,
  Loader,
  Dimmer,
  Segment,
  Icon
} from "semantic-ui-react";
import { NotificationManager } from "react-notifications";

import * as api from "../../api/machine";
import * as apiTypes from "../../api/machinetype";
import * as apiCustomer from "../../api/customer";

import type { Machine } from "../../api/machine";

export type Props = {
  editMachine: string => void,
  filterData: ?Machine
};

function MachineList(props: Props) {
  const [machineListData, setMachineListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [machineTypeData, setMachineTypeData] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  function getListData() {
    api
      .getFilteredMachines(props.filterData)
      .then(result => {
        result = api.checkResponse(result);
        setIsLoading(false);
        setMachineListData(result);
      })
      .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error));
  }

  function getCustomers() {
    apiCustomer
      .getCustomers(true)
      .then(result => {
        result = apiCustomer.checkResponse(result);
        setCustomerData(result);
      })
      .catch(error => {
        NotificationManager.error(
          "Kunden konnten nicht geladen werden",
          "Bitte überprüfen Sie Ihre Verbindung!"
        );
      });
  }

  function getCustomerText(id) {
    if (id) {
      const customer = customerData.find(x => x.id === id);
      if (customer) {
        return customer.firma;
      }
      return "Nicht gefunden";
    }
    return "Kein Besitzer hinterlegt";
  }

  function getMachineTypeText(id) {
    if (id) {
      const machineType = machineTypeData.find(x => x.id === id);
      if (machineType) {
        return machineType.fabrikat;
      }
      return "Nicht gefunden";
    }
    return "Kein Typ hinterlegt";
  }

  function getMachineTypes() {
    apiTypes
      .getMachineTypes()
      .then(result => {
        result = apiTypes.checkResponse(result);
        setMachineTypeData(result);
      })
      .catch(error => {
        NotificationManager.error(
          "Maschinentypen konnten nicht geladen werden",
          "Bitte überprüfen Sie Ihre Verbindung!"
        );
      });
  }

  useEffect(() => {
    getListData();
    getMachineTypes();
    getCustomers();
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
                maschinentypId
              },
              index
            ) => (
              <Table.Row key={index}>
                <Table.Cell
                  onClick={() => props.editMachine(id)}
                  className="Hover-effect link"
                >
                  <Icon name="external" size="tiny" className="Inline-icon" />{" "}
                  {seriennummer}
                </Table.Cell>
                <Table.Cell>{mastnummer}</Table.Cell>
                <Table.Cell>{motorennummer}</Table.Cell>
                <Table.Cell>{betriebsdauer || ""}</Table.Cell>
                <Table.Cell>{jahrgang || ""}</Table.Cell>
                <Table.Cell>{getCustomerText(besitzerId)}</Table.Cell>
                <Table.Cell>{getMachineTypeText(maschinentypId)}</Table.Cell>
              </Table.Row>
            )
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
