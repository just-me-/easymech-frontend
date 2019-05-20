// @flow

import React, {useState, useEffect} from 'react';
import {
    Form, Icon, Modal, Button,
} from 'semantic-ui-react';

import Machine from '../machine/Machine';
import SmartInput from '../shared/SmartInput';
import DatePicker from '../shared/DatePicker';
import NumberInput from '../shared/NumberInput';
import * as sharedCalls from '../shared/functions';
import * as validation from '../shared/validation';

import type {Transaction} from '../../api/transaction';
import type {TypeMachine} from '../../api/machine';

import '../shared/Fields.css';
import './TransactionFields.css';
import Radio from "semantic-ui-react/dist/commonjs/addons/Radio/Radio";

export type Props = {
    data?: Transaction,
    setData?: Transaction => void,
    setValidState?: boolean => void,
    searchView?: boolean,
    machine?: TypeMachine,
};

function TransactionFields(props: Props) {

    const initialData = {
        id: (props.data && props.data.id) || undefined,
        preis: (props.data && props.data.preis) || '',
        typ: (props.data && props.data.typ) || 0,
        datum: (props.data && props.data.datum) || sharedCalls.getToday(),
        maschinenId: (props.data && props.data.maschinenId) || '',
        kundenId: (props.data && props.data.kundenId) || '',
    };

    const [transactionData, setTransactionData] = useState(initialData);
    const [customerData, setCustomerData] = useState();
    const [machineData, setMachineData] = useState();
    const [dateIsValid, setDateIsValid] = useState(true);
    const [machineModalIsOpen, setMachineModalIsOpen] = useState(false);
    const [tempVal, setTempVal] = useState(undefined);

    function handleMachineSelect(result) {
        setTransactionData({...transactionData, maschinenId: result.id});
    }

    function handleCustomerSelect(result) {
        setTransactionData({...transactionData, kundenId: result.id});
    }

    function showMachineModal() {
        setMachineModalIsOpen(true);
    }

    function closeMachineModal(machine) {
        setMachineModalIsOpen(false);
        sharedCalls.getMachines({
            deletedToo: true,
            dataSetter: setMachineData,
        });
        handleMachineSelect(machine);
        setTempVal(machine.id);
    }

    function handleChange(element, {validate}) {
        let value = element.target.value;
        if (validate && (validate === 'number')) {
            value = validation.toNumber(value);
        }
        // 2Do: currency fehlt... number kann weg
        if (validate && (validate === 'date')) {
            value = validation.toDate(value);
            if (props.setValidState) {
                setDateIsValid(value ? validation.checkDate(value) : true);
            }
        }
        setTransactionData({...transactionData, [element.target.id]: value});
    }

    function datePicked(value, id) {
        setDateIsValid(validation.checkDate(value));
        setTransactionData({...transactionData, [id]: value});
    }

    function handleRadio(element, {label}) {
        if (label.includes('Verkauf')) {
            setTransactionData({...transactionData, "typ": 0});
        } else {
            setTransactionData({...transactionData, "typ": 1});
        }
    }

    useEffect(() => {
        const requiredIsValid = validation.checkRequired(transactionData.preis)
            && validation.checkDate(transactionData.datum)
            && parseInt(transactionData.maschinenId, 10) > 0
            && parseInt(transactionData.kundenId, 10) > 0;

        if (props.setValidState) {
            props.setValidState(requiredIsValid);
        }
        if (props.setData) {
            props.setData(transactionData);
        }
    });

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

    return (
        <div>
            <div className="Form-section">
                <Form.Group widths="equal">
                    <div className="field hasButton">
                        <SmartInput
                            id="maschine"
                            label="Maschinen"
                            matchingKey="seriennummer"
                            onResultSelect={handleMachineSelect}
                            elements={machineData}
                            setElementId={tempVal ? tempVal : (props.data ? props.data.maschinenId : 0)}
                            noResultsMessage="Keine Maschinen gefunden"
                            isRequired={!props.searchView}
                        />
                        <Button icon positive disabled={machineModalIsOpen} onClick={showMachineModal}>
                            <Icon name="add"/>
                        </Button>
                    </div>
                    <SmartInput
                        id="kunde"
                        label="Kunde"
                        matchingKey="firma"
                        onResultSelect={handleCustomerSelect}
                        elements={customerData}
                        setElementId={props.data ? props.data.kundenId : 0}
                        noResultsMessage="Keine Kunden gefunden"
                        isRequired={!props.searchView}
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <NumberInput
                        id="preis"
                        label="Preis"
                        innerLabel="CHF"
                        value={transactionData.preis}
                        validate="number"
                        handleChange={handleChange}
                        isRequired
                    />
                    <DatePicker
                        id="datum"
                        label="Datum"
                        value={transactionData.datum}
                        handleChange={handleChange}
                        error={!dateIsValid}
                        callbackSetter={datePicked}
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Radio
                            label='Verkauf einer Maschine erfassen'
                            checked={transactionData.typ === 0}
                            onChange={handleRadio}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='Ankauf einer Maschine erfassen'
                            checked={transactionData.typ === 1}
                            onChange={handleRadio}
                        />
                    </Form.Field>
                </Form.Group>
                <Modal open={machineModalIsOpen}>
                    <Modal.Content as={Machine} isIncluded includerCallback={closeMachineModal}/>
                </Modal>
            </div>
        </div>
    );
}

export default TransactionFields;
