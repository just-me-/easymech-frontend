// @flow

import React, { useState } from 'react'
import { Header, Form, Button, Dimmer, Loader } from 'semantic-ui-react'

import * as api from "../../api/customer";

import CustomerList from "./CustomerList";
import CustomerFields from "./CustomerFields";

function CustomerSearch() {
  const [viewState, setViewState] = useState("search");

  const [searchData, setSearchData] = useState({});
  const [customerEditData, setCustomerEditData] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);

  function saveCustomer() {
    if(formIsValid) {
      setViewState("loader");
      api
        .updateCustomer(customerEditData)
        .then((result) => {
            result = api.checkResponse(result);
            setViewState("list");
            console.log("Kunde wurde gespeichert...", result);
        })
        .catch(error => {
          console.log("Ups, ein Fehler ist aufgetreten", error)
        });
    } else {
        console.log("Pflichtfelder nicht ausgefüllt oder sonst ein Fehler... 2Do")
    }
  }

  function deleteCustomer() {
    setViewState("loader");
    api
      .deleteCustomer(customerEditData.id)
      .then((result) => {
          result = api.checkResponse(result);
          setViewState("list");
          console.log("Kunde wurde gelöscht...", result);
      })
      .catch(error => {
        console.log("Ups, ein Fehler ist aufgetreten", error)
      });
  }

  function onEditCustomerClick(customerId) {
    setViewState("loader");
    api
      .getCustomer(customerId)
      .then((result) => {
        result = api.checkResponse(result);
        setCustomerEditData(result);
        // 2Do - fancyer mit timeout oder lieber sofort?
        setTimeout(() => setViewState("edit"), 200);
      })
      .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error));
  }

  return (
    <div>
        {viewState === 'search' &&
        <div>
          <Header as='h1' textAlign='center'>
            Kunden suchen
          </Header>
          <Form>
            <CustomerFields data={searchData} setData={setSearchData} searchView/>
            <Button primary content='Suchen' icon='search' labelPosition='left'
                    onClick={() => setViewState('list')} floated='right'
            />
          </Form>
        </div>
        }

        {viewState === 'list' &&
        <div>
          <CustomerList editCustomer={onEditCustomerClick} filterData={searchData}/>
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
            <CustomerFields data={customerEditData} setData={setCustomerEditData} setValidState={setFormIsValid} />
            <Button content='Abbrechen' icon='arrow left' labelPosition='left'
                    onClick={() => setViewState('list')}
            />
            <Button content='Löschen' icon='trash' labelPosition='left'
                    onClick={() => deleteCustomer()}
            />
            <Button primary content='Speichern' icon='save' labelPosition='left' floated='right'
                    onClick={() => saveCustomer()}
            />
          </Form>
        </div>
        }

        {viewState === 'loader' && // show this view before ajax calls
        <div>
          <Dimmer active inverted>
             <Loader />
          </Dimmer>
        </div>
        }

    </div>
  )
}

export default CustomerSearch
