// @flow

import React, { useState } from 'react'
import { Header, Form, Button, Dimmer, Loader } from 'semantic-ui-react'
import { NotificationManager } from 'react-notifications';

import * as api from "../../api/customer";

import CustomerList from "./CustomerList";
import CustomerFields from "./CustomerFields";

export type Props = {
  location: {
    state: {
      listRedirect?: string
    }
  }
};

function CustomerSearch(props: Props) {
  const initState = (props.location.state && props.location.state.listRedirect) ? "list" : "search";
  const [viewState, setViewState] = useState(initState);

  const [searchData, setSearchData] = useState({});
  const [customerEditData, setCustomerEditData] = useState({});
  const [key, setKey] = useState(Math.random());
  const [formIsValid, setFormIsValid] = useState(true); //alrdy saved, unchanged entries are valid

  function saveCustomer() {
    if(formIsValid) {
      setViewState("loader");
      api
        .updateCustomer(customerEditData)
        .then((result) => {
            result = api.checkResponse(result);
            setViewState("list");
            NotificationManager.success("Der Kunde wurde erfolgreich gespeichert.", result.firma+" aktualisiert");
        })
        .catch(error => {
          console.log("Ups, ein Fehler ist aufgetreten", error);
          setViewState("edit");
          NotificationManager.error("Beim Speichern ist ein Fehler aufgetreten.", "Bitte erneut versuchen!");
        });
    } else {
      NotificationManager.info("Bitte überprüfen Sie Ihre Eingaben!");
    }
  }

  function deleteCustomer() {
    setViewState("loader");
    api
      .deleteCustomer(customerEditData.id)
      .then((result) => {
          result = api.checkResponse(result);
          setViewState("list");
          NotificationManager.success("Der Kunde wurde erfolgreich gelöscht.", customerEditData.firma+" gelöscht");
      })
      .catch(error => {
        console.log("Ups, ein Fehler ist aufgetreten", error);
        setViewState("edit");
        NotificationManager.error("Beim Löschen ist ein Fehler aufgetreten.", "Bitte erneut versuchen!");
      });
  }

  function onEditCustomerClick(customerId) {
    setViewState("loader");
    api
      .getCustomer(customerId)
      .then((result) => {
        setKey(Math.random()); // be sure that a fresh form is prepered
        result = api.checkResponse(result);
        setCustomerEditData(result);
        setTimeout(() => setViewState("edit"), 200);
      })
      .catch(error => {
        console.log("Ups, ein Fehler ist aufgetreten", error);
        setViewState("list");
        NotificationManager.error("Beim Laden des Kundens ist ein Fehler aufgetreten.", "Bitte erneut versuchen!");
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
            <CustomerFields data={customerEditData} setData={setCustomerEditData}
                            setValidState={setFormIsValid} key={key}
            />
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
