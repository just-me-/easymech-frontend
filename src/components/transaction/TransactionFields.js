// @flow

import _ from 'lodash'
import React, {useState, useEffect} from 'react'
import {Search, Form, Header} from 'semantic-ui-react'
import {NotificationManager} from "react-notifications";

import NumberInput from "../NumberInput"

import * as validation from "../validation"
import * as apiMachine from "../../api/machine";
import * as apiCustomer from "../../api/customer";

import type {MachineType} from "../../api/machinetype";
import type {Transaction} from "../../api/transaction";

export type Props = {
    data?: Transaction,
    setData?: (Transaction) => void,
    setValidState?: (boolean) => void,
    searchView?: boolean,
    machineTyp?: MachineType
};

function TransactionFields(props: Props) {

    const initialData = {
        id: (props.data && props.data.id) || undefined,
        seriennummer: (props.data && props.data.seriennummer) || "",
        mastnummer: (props.data && props.data.mastnummer) || "",
        motorennummer: (props.data && props.data.motorennummer) || "",
        betriebsdauer: (props.data && props.data.betriebsdauer) || "",
        jahrgang: (props.data && props.data.jahrgang) || "",
        notiz: (props.data && props.data.notiz) || "",
        maschinentypId: (props.data && props.data.maschinentypId) || "",
        besitzerId: (props.data && props.data.besitzerId) || "",
        isActive: (props.data && props.data.isActive) || ""
    };

    const [transactionData, setTransactionData] = useState(initialData);

    const [machines, setMachines] = useState([]);
    const [machineResults, setMachineResults] = useState([]);
    const [isMachineLoading,setMachineLoading] = useState(false);
    const [machineValue,setMachineValue] = useState();

    const [customer, setCustomer] = useState([]); // 2Do - plural oder?
    const [customerResults, setCustomerResults] = useState([]);
    const [customerValue,setCustomerValue] = useState();
    const [isCustomerLoading,setCustomerLoading] = useState(false);

    function resetMachineSearchComponent(){
        setMachineLoading(false);
        setMachineResults([]);
        setMachineValue("");
    }
    function resetCustomerSearchComponent(){
        setCustomerLoading(false);
        setCustomerResults([]);
        setCustomerValue("");
    }

    function handleMachineSelect(e, { result }){
        setTransactionData({...transactionData, 'maschinenid': result.id});
        setMachineValue(result.seriennummer);
    }

    function handleCustomerSelect(e, { result }){
        setTransactionData({...transactionData, 'kundenid': result.id});
        setCustomerValue(result.title);
    }

    function handleMachineChange(e, { value }){
        setMachineLoading(true);
        setMachineValue(e.target.value);
        setTimeout(() => {
            if (value.length < 1) return resetMachineSearchComponent();

            const re = new RegExp(_.escapeRegExp(value), 'i');
            const isMatch = machineResults => re.test(machineResults.seriennummer);

            setMachineLoading(false);
            setMachineResults(_.filter(machines, isMatch));
        }, 300)
    }

    function handleCustomerChange(e, { value }){
        setCustomerLoading(true);
        setCustomerValue(e.target.value);
        setTimeout(() => {
            if (value.length < 1) return resetCustomerSearchComponent;

            const re = new RegExp(_.escapeRegExp(value), 'i');
            const isMatch = customerResults => re.test(customerResults.firma);

            setCustomerLoading(false);
            setCustomerResults(_.filter(customer, isMatch));
        }, 300)
    }

    function getCustomersList(){
        apiCustomer
            .getCustomers()
            .then((result) => {
                setCustomer(apiCustomer.checkResponse(result))
            })
            .catch(error => {
                console.log("Ups, ein Fehler ist aufgetreten", error);
                NotificationManager.error("Kunden konnten nicht geladen werden", "Bitte überprüfen Sie Ihre Verbindung!");
            });
    }

    function getMachinesName(){
        apiMachine
            .getMachines()
            .then((result) => {
                setMachines(apiMachine.checkResponse(result));
            })
            .catch(error => {
                console.log("Ups, ein Fehler ist aufgetreten", error);
                NotificationManager.error("Maschinen konnten nicht geladen werden", "Bitte überprüfen Sie Ihre Verbindung!");
            });
    }

    function handleChange(element, { validate }) {
        let value = element.target.value;
        switch(validate) {
            case "number":
                value = validation.toNumber(value);
                break;
            case "date":
                console.log("2Do DATE VALIDATION");
                break;
            default:
                break;
        }
        setTransactionData({...transactionData, [element.target.id]: value});
    }

    useEffect(() => {
        const requiredIsValide = validation.checkRequired(transactionData.preis);
        if(props.setValidState) {
            props.setValidState(requiredIsValide);
        }
        if(props.setData) {
            props.setData(transactionData);
        }
    });

    useEffect(() => {
        setCustomer(getCustomersList());
        setMachines(getMachinesName());
    }, []);

    useEffect(() => {
        if(customer && customer.length > 0) {
            if(props.data && props.data.id) {
                const besitzerId = props.data.besitzerId;
                if(besitzerId) {
                    const owner = customer.find(x => x.id === besitzerId);
                    setCustomerValue(owner ? owner.firma : "");
                }
            }
        }
    }, [customer]);

    useEffect(() => {
        if(machines && machines.length > 0) {
            if(props.data && props.data.id) {
                const maschinenid = props.data.maschinenid;
                if(maschinenid) {
                    const maschine = machines.find(x => x.id === maschinenid);
                    setMachineValue(maschine ? maschine.seriennummer : "");
                }
            }
        }
    }, [machines]);

    return (
        <div>
            <Header as='h2'>Ankauf</Header>
            <div className="Form-section">
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Search}
                        label='Maschine'
                        loading={isMachineLoading}
                        onResultSelect={handleMachineSelect}
                        onSearchChange={_.debounce(handleMachineChange, 500, { leading: true })}
                        results={machineResults.map((result, index) => {return {key: index, id: result.id, title: result.seriennummer}})}
                        value={machineValue}
                        noResultsMessage='Keine Maschinen gefunden'
                        placeholder={props.searchView ? '' : 'Pflichtfeld'}
                    />
                    <Form.Field
                        control={Search}
                        label='Besitzer'
                        loading={isCustomerLoading}
                        onResultSelect={handleCustomerSelect}
                        onSearchChange={_.debounce(handleCustomerChange, 500, { leading: true })}
                        results={customerResults.map((result, index) => {return {key: index, id: result.id, title: result.firma}})}
                        value={customerValue}
                        noResultsMessage='Keine Kunden gefunden'
                        placeholder={props.searchView ? '' : 'Pflichtfeld'}
                    />
                </Form.Group>

                <Form.Group widths='equal'>
                    <NumberInput
                        id='preis'
                        label='Preis' innerLabel='CHF'
                        value={transactionData.preis} validate='number'
                        handleChange={handleChange}
                    />
                    <Form.Input
                        id='datum'
                        label='Datum'
                        value={transactionData.datum}
                        onChange={handleChange}
                    />
                </Form.Group>
                </div>
                <Header as='h2'>Verkauf</Header>
                <div className="Form-section">
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Search}
                            label='Maschine'
                            loading={isMachineLoading}
                            onResultSelect={handleMachineSelect}
                            onSearchChange={_.debounce(handleMachineChange, 500, { leading: true })}
                            results={machineResults.map((result, index) => {return {key: index, id: result.id, title: result.seriennummer}})}
                            value={machineValue}
                            noResultsMessage='Keine Maschinen gefunden'
                            placeholder={props.searchView ? '' : 'Pflichtfeld'}
                        />
                        <Form.Field
                            control={Search}
                            label='Besitzer'
                            loading={isCustomerLoading}
                            onResultSelect={handleCustomerSelect}
                            onSearchChange={_.debounce(handleCustomerChange, 500, { leading: true })}
                            results={customerResults.map((result, index) => {return {key: index, id: result.id, title: result.firma}})}
                            value={customerValue}
                            noResultsMessage='Keine Kunden gefunden'
                            placeholder={props.searchView ? '' : 'Pflichtfeld'}
                        />
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <NumberInput
                            id='preis'
                            label='Preis' innerLabel='CHF'
                            value={transactionData.preis} validate='number'
                            handleChange={handleChange}
                        />
                        <Form.Input
                            id='datum'
                            label='Datum'
                            value={transactionData.datum}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>
        </div>
    )
}

export default TransactionFields
