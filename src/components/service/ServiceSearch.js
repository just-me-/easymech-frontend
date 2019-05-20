// @flow

import React, {useState} from 'react';
import {Button, Form, Header} from 'semantic-ui-react';
import {NotificationManager} from 'react-notifications';

import SearchFields from './SearchFields';
import ServiceList from './ServiceList';

export type Props = {
    location: {
        state: {
            listRedirect?: string,
        },
    },
};

function ServiceSearch(props: Props) {
    const initState = props.location.state && props.location.state.listRedirect ? 'list' : 'search';
    const [viewState, setViewState] = useState(initState);
    const [searchData, setSearchData] = useState({});
    const [formIsValid, setFormIsValid] = useState(true);

    function listData() {
        if (formIsValid) {
            console.log(searchData);
            setViewState('list');
        } else {
            NotificationManager.info('Bitte prüfen Sie Ihre Eingabe!');
        }
    }

    function editEntry(id, type) {
        console.log("2Do", id, type);
    }

    return (
        <div>
            {viewState === 'search' && (
                <div>
                    <Header as="h1" textAlign="center">
                        Dienstleistung suchen
                    </Header>
                    <Form>
                        <SearchFields
                            data={searchData}
                            setData={setSearchData}
                            setValidState={setFormIsValid}
                            searchView
                        />
                        <Button
                            primary
                            content="Suchen"
                            icon="search"
                            labelPosition="left"
                            onClick={listData}
                            floated="right"
                        />
                    </Form>
                </div>
            )}

            {viewState === 'list' && (
                <div>
                    <ServiceList filterData={searchData} editEntry={editEntry}/>
                    <Button
                        content="Zurück"
                        icon="arrow left"
                        labelPosition="left"
                        onClick={() => setViewState('search')}
                    />
                </div>
            )}
        </div>
    );
}

export default ServiceSearch;
