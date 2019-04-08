// @flow

import React, { useState } from 'react'
import { Header, Form, Button } from 'semantic-ui-react'

import CustomerList from "./CustomerList";
import CustomerFields from "./CustomerFields";

function CustomerSearch() {
  const [viewState, setViewState] = useState("search");

  const [searchData, setSearchData] = useState({});
  const [customerListData, setCustomerListData] = useState([{}]);
  const [customerEditData, setCustomerEditData] = useState({});

  return (
    <div>
        {viewState === 'search' &&
        <div>
          <Header as='h1' textAlign='center'>
            Kunden suchen
          </Header>
          <Form>
            <CustomerFields/>
            <Button primary content='Suchen' icon='search' labelPosition='left'
                    onClick={() => setViewState('list')}
            />
          </Form>
        </div>
        }

        {viewState === 'list' &&
        <div>
          <CustomerList searchData={searchData} setSearchData={setSearchData} />
          <Button content='Zurück' icon='arrow left' labelPosition='left'
                  onClick={() => setViewState('search')}
          />
        </div>
        }

    </div>
  )
}

export default CustomerSearch
