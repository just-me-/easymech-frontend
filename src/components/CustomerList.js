// @flow

import _ from 'lodash'
import React, {useState, useEffect} from 'react'
import { Header, Table, Checkbox, Button, Icon } from 'semantic-ui-react'

import {
  Link
} from "react-router-dom";

import * as api from "../api/customer";

function CustomerList(props) {

  const [customerListData, setCustomerListData] = useState([{}]);

  function getListData() {
  api
    .getCustomers()
    .then((result) => {
      // setCustomerListData(result);
    })
    .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error))
    .finally( () => {
      // TMP Fix data 'til api works...
      setCustomerListData([
        {"id":1,"firma":"Toms Vergnügungspark","vorname":"Tom","nachname":"K","plz":7000,"ort":"Chur",
        "email":"t-kistler@bluewin.ch","telefon":"081 123 45 68","notiz":"Zahlt immer pünktlich, ist ganz nett.\r\n                    Darf weider mal eine Maschine mieten",
        "isActive":true,"timestamp":null},

        {"id":2,"firma":"DJ Fire","vorname":"Dario","nachname":"Fuoco","plz":7500,"ort":"Sargans",
        "email":"DJ-Fire (at) geilepartysimbunker (dot) com","telefon":null,"notiz":null,"isActive":true,
        "timestamp":null}
      ]);
    });
  }

  useEffect(() => {
    getListData();
  }, []);

  return (
    <div>
      <Header as='h1' textAlign='center'>
        Gefundene Kunden
      </Header>

      <Table celled selectable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Firmenname</Table.HeaderCell>
            <Table.HeaderCell>Adresse</Table.HeaderCell>
            <Table.HeaderCell>PLZ</Table.HeaderCell>
            <Table.HeaderCell>Ort</Table.HeaderCell>
            <Table.HeaderCell>Vorname</Table.HeaderCell>
            <Table.HeaderCell>Nachname</Table.HeaderCell>
            <Table.HeaderCell>E-Mail</Table.HeaderCell>
            <Table.HeaderCell>Tel.</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(customerListData, ({ id, firma, adresse, vorname, nachname, plz, ort, email, telefon }) => (
            <Table.Row key={id}>
              <Table.Cell onClick={() => props.editCustomer(id)}>{firma}</Table.Cell>
              <Table.Cell>{adresse}</Table.Cell>
              <Table.Cell>{vorname}</Table.Cell>
              <Table.Cell>{nachname}</Table.Cell>
              <Table.Cell>{plz}</Table.Cell>
              <Table.Cell>{ort}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
              <Table.Cell>{telefon}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default CustomerList
