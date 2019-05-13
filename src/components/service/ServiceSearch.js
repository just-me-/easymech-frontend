// @flow

import React, {useState} from 'react';
import {Button, Form, Header} from 'semantic-ui-react';
import ServiceSearchFields from "./ServiceSearchFields";

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


    return (
        <div>
            {viewState === 'search' && (
                <div>
                    <Header as="h1" textAlign="center">
                        Dienstleistung suchen
                    </Header>
                    <Form>
                        <ServiceSearchFields data={searchData} setData={setSearchData} searchView />

                        <Button
                            primary
                            content="Suchen"
                            icon="search"
                            labelPosition="left"
                            onClick={() => setViewState('list')}
                            floated="right"
                        />
                    </Form>
                </div>
            )}

        </div>
  );
}

export default ServiceSearch;
