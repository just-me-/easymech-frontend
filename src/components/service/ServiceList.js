// @flow

import React, { useState, useEffect } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';

import * as serviceCalls from '../shared/functions';

import ServiceSearchList from './ServiceSearchList';
import TransactionSearchList from '../transaction/TransactionSearchList';
import RentalSearchList from '../transaction/RentalSearchList';
import ServiceFields from './ServiceFields';
import RentalFields from '../transaction/RentalFields';
import TransactionFields from '../transaction/TransactionFields';

export type Props = {
  filterData: any,
};

function ServiceList(props: Props) {
  const [machineData, setMachineData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [viewState, setViewState] = useState('list');
  const [editType, setEditType] = useState();
  const [editData, setEditData] = useState();
  const [key, setKey] = useState(Math.random());
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    serviceCalls.getCustomers({
      deletedToo: true,
      dataSetter: setCustomerData,
    });

    serviceCalls.getMachines({
      deletedToo: true,
      dataSetter: setMachineData,
    });
  }, []);

  function getCustomerText(id: number) {
    if (id) {
      const customer = customerData.find(x => x.id === id);
      if (customer) {
        return customer.firma;
      }
      return 'Nicht gefunden';
    }
    return 'Kunde hinterlegt';
  }

  function getMachineText(id: number) {
    if (id) {
      const machine = machineData.find(x => x.id === id);
      if (machine) {
        return machine.seriennummer;
      }
      return 'Nicht gefunden';
    }
    return 'Keine Maschine hinterlegt';
  }

  function onEditItem(itemId, type, data) {
    setEditType(type);
    setEditData(data);
    setViewState('edit');
    setKey(Math.random());
    console.log(data);
  }

  return (
    <div>
      {viewState === 'list' && props.filterData.searchService && (
        <ServiceSearchList
          editItem={onEditItem}
          filterData={props.filterData}
          resolveCustomer={getCustomerText}
          resolveMachine={getMachineText}
          title="Gefundene Dienstleistungen"
        />
      )}

      {viewState === 'list' && props.filterData.searchTransaction && (
        <TransactionSearchList
          editItem={onEditItem}
          filterData={props.filterData}
          resolveCustomer={getCustomerText}
          resolveMachine={getMachineText}
          title="Gefundene An - und Verkäufe"
        />
      )}

      {viewState === 'list' && props.filterData.searchRental && (
        <RentalSearchList
          editItem={onEditItem}
          filterData={props.filterData}
          resolveCustomer={getCustomerText}
          resolveMachine={getMachineText}
          title="Gefundene Reservationen"
        />
      )}

      {viewState === 'edit' && editType === 'service' && (
        <div>
          <Header as="h1" textAlign="center">
            Service bearbeiten
          </Header>
          <Form>
            <ServiceFields
              key={key}
              data={editData}
              setData={setEditData}
              setValidState={setFormIsValid}
            />
          </Form>
        </div>
      )}

      {viewState === 'edit' && editType === 'transaction' && (
        <div>
          <Header as="h1" textAlign="center">
            Transaktion bearbeiten
          </Header>
          <Form>
            <TransactionFields
              key={key}
              data={editData}
              setData={setEditData}
              setValidState={setFormIsValid}
            />
          </Form>
        </div>
      )}

      {viewState === 'edit' && editType === 'rental' && (
        <div>
          <Header as="h1" textAlign="center">
            Reservation bearbeiten
          </Header>
          <Form>
            <RentalFields data={editData} setData={setEditData} setValidState={setFormIsValid} />
          </Form>
        </div>
      )}

      {viewState === 'edit' && (
        <Button
          primary
          content="Speichern"
          icon="save"
          labelPosition="left"
          floated="right"
          onClick={() => serviceCalls.saveEntry(formIsValid, setViewState, editType, editData)}
        />
      )}
    </div>
  );
}

export default ServiceList;
