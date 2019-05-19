// @flow

import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
    Header, Table, Loader, Dimmer, Segment, Icon,
} from 'semantic-ui-react';

import * as sharedCalls from '../shared/functions';
import * as serviceCalls from '../shared/functions';


export type Props = {
    editItem: (id: string, type: string) => void,
    filterData: ?any,
};

function ServiceSearchList(props: Props) {
    const [serviceData, setServiceData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [machineData, setMachineData] = useState([]);
    const [customerData, setCustomerData] = useState([]);


    useEffect(() => {
        sharedCalls.getCustomers({
            deletedToo: true,
            dataSetter: setCustomerData,
        });

        sharedCalls.getMachines({
            deletedToo: true,
            dataSetter: setMachineData,
        });
    }, []);

    useEffect(() => {
        const baseParameters = {
            state: 'all',
            filterData: props.filterData,
            loadingSetter: setIsLoading,
        };

        if(props.filterData.searchService){
            serviceCalls.getServices({
                ...baseParameters,
                type: 'services',
                dataSetter: setServiceData,
            });
        }
    }, []);


    function getCustomerText(id) {
        if (id) {
            const customer = customerData.find(x => x.id === id);
            if (customer) {
                return customer.firma;
            }
            return 'Nicht gefunden';
        }
        return 'Kunde hinterlegt';
    }

    function getMachineText(id) {
        if (id) {
            const machine = machineData.find(x => x.id === id);
            if (machine) {
                return machine.seriennummer;
            }
            return 'Nicht gefunden';
        }
        return 'Keine Maschine hinterlegt';
    }

    return (
        <div>
            <Header as="h1" textAlign="center">
                Gefundene Services
            </Header>

            <Table celled selectable striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Reservationsnr.</Table.HeaderCell>
                        <Table.HeaderCell>Bezeichnung</Table.HeaderCell>
                        <Table.HeaderCell>Beginn</Table.HeaderCell>
                        <Table.HeaderCell>Ende</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Kunde</Table.HeaderCell>
                        <Table.HeaderCell>Maschine</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_.map(
                        serviceData,
                        (
                            {
                                id,
                                bezeichnung,
                                beginn,
                                ende,
                                status,
                                maschinenId,
                                kundenId,
                            },
                            index,
                        ) => (
                            <Table.Row key={index}>
                                <Table.Cell onClick={() => props.editItem(id,"services")} className="Hover-effect link">
                                    <Icon name="external" size="tiny" className="Inline-icon" />
                                    &nbsp;
                                    {id}
                                </Table.Cell>
                                <Table.Cell>{bezeichnung}</Table.Cell>
                                <Table.Cell>{beginn | ''}</Table.Cell>
                                <Table.Cell>{ende || ''}</Table.Cell>
                                <Table.Cell>{status|| ''}</Table.Cell>
                                <Table.Cell>{getCustomerText(kundenId)}</Table.Cell>
                                <Table.Cell>{getMachineText(maschinenId)}</Table.Cell>
                            </Table.Row>
                        ),
                    )}
                </Table.Body>
            </Table>

            {isLoading && (
                <Segment>
                    <Dimmer inverted active>
                        <Loader inverted>Services werden geladen...</Loader>
                    </Dimmer>
                </Segment>
            )}
        </div>
    );
}

export default ServiceSearchList;
