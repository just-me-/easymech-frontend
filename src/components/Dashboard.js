// @flow

import React, { useState, useEffect } from 'react';
import {Button, Form, Header} from 'semantic-ui-react';
import * as sharedFunctions from "./shared/functions";
import ServiceSearchList from "./service/ServiceSearchList";
import ServiceFields from "./service/ServiceFields";
import {saveEntry} from "./shared/functions";


/*import ServiceSearchList from "./ServiceSearchList";
import RentalSearchList from "../transaction/RentalSearchList";
*/

function Dashboard() {

    const filterPlannedServices = {
        searchService: true,
        von: sharedFunctions.getToday()
    };
    const [machineData, setMachineData] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [viewState, setViewState] = useState('list');
    const [editType, setEditType] = useState();
    const [editData, setEditData] = useState();
    const [key, setKey] = useState(Math.random());
    const [formIsValid, setFormIsValid] = useState(false);


    useEffect(() => {
        sharedFunctions.getCustomers({
            deletedToo: true,
            dataSetter: setCustomerData,
        });

        sharedFunctions.getMachines({
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
            {(viewState === 'list') && (
                <ServiceSearchList
                    editItem={onEditItem}
                    filterData={filterPlannedServices}
                    resolveCustomer={getCustomerText}
                    resolveMachine={getMachineText}
                    title='Anstehende Services'
                />
            )}


            {viewState === 'edit' && editType === 'service' && (
                <div>
                    <Header as="h1" textAlign="center">
                        Service editieren
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

            {viewState === 'edit' && (
                <Button
                    primary
                    content="Speichern"
                    icon="save"
                    labelPosition="left"
                    floated="right"
                    onClick={() => saveEntry(formIsValid, setViewState, editType,editData)}
                />
            )}
        </div>
  );
}

export default Dashboard;
