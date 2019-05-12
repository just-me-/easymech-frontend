// @flow

import React, {useState, useEffect} from 'react'
import {Dropdown, Form} from 'semantic-ui-react'
import {NotificationManager} from "react-notifications";
import SmartInput from '../shared/SmartInput';

import NumberInput from "../shared/NumberInput"

import * as validation from "../shared/validation"
import * as apiMachine from "../../api/machine";
import * as apiCustomer from "../../api/customer";
import type {Transaction} from "../../api/transaction";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";
import Portal from "semantic-ui-react/dist/commonjs/addons/Portal/Portal";
import Machine from "../machine/Machine"
import type { TypeMachine } from '../../api/machine';


export type Props = {
    data?: Transaction,
    setData?: (Transaction) => void,
    setValidState?: (boolean) => void,
    searchView?: boolean,
    machine?: TypeMachine
};

function TransactionFields(props: Props) {
    const options = [
        { key: 'Verkauf', text: 'Verkauf einer Maschine erfassen', value: '0', },
        { key: 'Ankauf', text: 'Ankauf einer Maschine erfassen', value: '1', },
    ];

    const today = new Date();
    const initialData = {
        id: (props.data && props.data.id) || undefined,
        preis: (props.data && props.data.preis) || "",
        typ: (props.data && props.data.typ) || 0,
        datum: (props.data && props.data.datum) || today.toISOString().substring(0, 10),
        maschinenid: (props.data && props.data.maschinenid) || "",
        kundenid: (props.data && props.data.kundenid) || ""
    };
    const [transactionData, setTransactionData] = useState(initialData);
    const [customerData, setCustomerData] = useState();
    const [machineData, setMachineData] = useState();
    const [isOpen,setOpen] = useState(false);

    function reportError(type, error){
        console.log('Ups, ein Fehler ist aufgetreten', error);
        NotificationManager.error(
            type + ' konnten nicht geladen werden'
        );
    }

    function handleMachineSelect(result) {
        setTransactionData({ ...transactionData, maschinenid: result.id });
    }

    function handleCustomerSelect(result) {
        setTransactionData({ ...transactionData, kundenid: result.id });
    }

    function getCustomersList() {
        apiCustomer
            .getCustomers()
            .then((result) => {
                setCustomerData(apiCustomer.checkResponse(result));
            })
            .catch((error) => {
                reportError("Kunden",error);
            });
    }

    function getMachineName() {
        apiMachine
            .getMachines()
            .then((result) => {
                setMachineData(apiMachine.checkResponse(result));
            })
            .catch((error) => {
                reportError("Maschinen",error)
            });
    }

    function handlePortal(){
        setOpen(!isOpen);
    }

    function handleChange(element, { validate }) {
        let value = element.target.value;
        switch (validate) {
            case 'number':
                value = validation.toNumber(value);
                break;
            case 'date':
                console.log('2Do DATE VALIDATION');
                break;
            default:
                break;
        }
        setTransactionData({ ...transactionData, [element.target.id]: value });
    }
    function handleDropDown(element){
        let value = element.target.innerHTML;
        if(value.includes("Ankauf")){
            setTransactionData({ ...transactionData, typ: 1});
        }
    }

    useEffect(() => {
        const requiredIsValid = validation.checkRequired(transactionData.preis);

        if (props.setValidState) {
            props.setValidState(requiredIsValid);
        }
        if (props.setData) {
            props.setData(transactionData);
        }
    });

    useEffect(() => {
        setCustomerData(getCustomersList());
        setMachineData(getMachineName());
    }, []);

    return (
        <div>
            <div className="Form-section">
                <Form.Group widths='equal'>
                    <SmartInput
                        label="Maschinen"
                        matchingKey="seriennummer"
                        onResultSelect={handleMachineSelect}
                        elements={machineData}
                        setElementId={props.data ? props.data.maschinenid : 0}
                        noResultsMessage="Keine Maschinen gefunden"
                        isRequired={!props.searchView}
                    />

                    <SmartInput
                        label="Kunde"
                        matchingKey="firma"
                        onResultSelect={handleCustomerSelect}
                        elements={customerData}
                        setElementId={props.data ? props.data.kundenid : 0}
                        noResultsMessage="Keine Kunden gefunden"
                        isRequired={!props.searchView}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <NumberInput
                        id='preis'
                        label='Preis'
                        innerLabel='CHF'
                        value={transactionData.preis}
                        validate='number'
                        handleChange={handleChange}
                    />
                    <Form.Input
                        id='datum'
                        label='Datum'
                        placeholder='YYYY-MM-DD'
                        value={transactionData.datum}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Dropdown
                        id='typ'
                        placeholder='Auswahl Transaktion'
                        fluid
                        selection
                        options={options}
                        onChange={handleDropDown}
                    />
                </Form.Group>
                <Form.Group>
                    <Button
                        content='Maschine Erfassen'
                        disabled={isOpen}
                        onClick={handlePortal}
                        positive
                    />

                    <Portal open={isOpen} >
                        <Segment
                            style={{
                                left: '40%',
                                position: 'fixed',
                                top: '20%',
                                zIndex: 1000,
                            }}
                            pilled
                        >

                            <Machine/>

                            <Button
                                content='Schliessen'
                                negative
                                onClick={() =>{
                                    handlePortal();
                                    getMachineName();
                                }}
                            />
                        </Segment>
                    </Portal>
                </Form.Group>
            </div>
        </div>
    )
}

export default TransactionFields
