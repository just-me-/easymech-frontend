// @flow

import React, { useState } from 'react'
import { Header, Form, Button } from 'semantic-ui-react'

import * as api from "../api/customer";

import CustomerList from "./CustomerList";
import CustomerFields from "./CustomerFields";

function CustomerSearch() {
  const [viewState, setViewState] = useState("search");

  const [searchData, setSearchData] = useState({});
  const [customerEditData, setCustomerEditData] = useState({});

  function onEditCustomerClick(customerId) {

    api
      .getCustomer(customerId)
      .then((result) => {
        // setCustomerEditData(result);
        // setViewState("edit");
      })
      .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error))
      .finally( () => {
        // TMP Fix data 'til api works...
        setCustomerEditData(
          {"id":2,"firma":"DJ Fire","vorname":"Dario","nachname":"Fuoco","plz":7500,"ort":"Sargans",
          "email":"DJ-Fire (at) geilepartysimbunker (dot) com","telefon":null,"notiz":null,"isActive":true,
          "timestamp":null});
        setViewState("edit");
      });
  }

  return (
    <div>
        {viewState === 'search' &&
        <div>
          <Header as='h1' textAlign='center'>
            Kunden suchen
          </Header>
          <Form>
            <CustomerFields data={customerEditData} setData={setCustomerEditData} />
            <Button primary content='Suchen' icon='search' labelPosition='left'
                    onClick={() => setViewState('list')}
            />
          </Form>
        </div>
        }

        {viewState === 'list' &&
        <div>
          <CustomerList editCustomer={onEditCustomerClick}/>
          <Button content='Zurück' icon='arrow left' labelPosition='left'
                  onClick={() => setViewState('search')}
          />
        </div>
        }

        {viewState === 'edit' &&
        <div>
          <Header as='h1' textAlign='center'>
            Kunde bearbeiten
          </Header>
          <Form>
            <CustomerFields data={customerEditData} setData={setCustomerEditData} />
            <Button content='Abbrechen' icon='arrow left' labelPosition='left'
                    onClick={() => setViewState('list')}
            />
            <Button primary content='Speichern' icon='save' labelPosition='left'
                    onClick={() => setViewState('list')}
            />
          </Form>
        </div>
        }

    </div>
  )
}

export default CustomerSearch
