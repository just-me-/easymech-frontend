// @flow

import React, {useState, useEffect} from 'react'
import {Dropdown, Form} from 'semantic-ui-react'
import SmartInput from '../shared/SmartInput';

import * as helper from "../shared/functions"
import * as validation from "../shared/validation"
import type {Transaction} from "../../api/transaction";
import type { TypeMachine } from '../../api/machine';
import "../shared/Fields.css"
import NumberInput from "../shared/NumberInput";


export type Props = {
    data?: Transaction,
    setData?: (Transaction) => void,
    setValidState?: (boolean) => void,
    searchView?: boolean,
    machine?: TypeMachine
};

function ServiceSearchFields(props: Props) {
    const options = [
        { key: 'Transaktionen', text: 'Ankauf oder Verkauf durchsuchen', value: '0', },
        { key: 'Reservationen', text: 'Reservationen durchsuchen', value: '1', },
        { key: 'Dienstleistungen', text: 'Dienstleistungen durchsuchen', value: '2'}
    ];

    const initialData = {
        maschinenId: (props.data && props.data.maschineId) || '',
        kundenId: (props.data && props.data.kundenId) || '',
        maschinentypId: (props.data && props.data.maschinentypId) || '',
        startdatum: (props.data && props.data.startdatum) || '',
        enddatum: (props.data && props.data.enddatum) || '',
    };

    const [searchData, setSearchData] = useState(initialData);
    const [customerData, setCustomerData] = useState();
    const [machineData, setMachineData] = useState();
    const [machineTypeData, setMachineTypeData] = useState();

    function handleMachineSelect(result) {
        setSearchData({ ...searchData, maschinenId: result.id });
    }

    function handleCustomerSelect(result) {
        setSearchData({ ...searchData, kundenId: result.id });
    }

    function handleMachineTypeSelect(result) {
        setSearchData({ ...searchData, maschinentypId: result.id });
    }


    function handleChange(element, { validate }) {
        let value = element.target.value;
        switch (validate) {
            case 'number':
                value = validation.toNumber(value);
                break;
            case 'date':
                value = validation.toDate(value);
                break;
            default:
                break;
        }
        setSearchData({ ...searchData, [element.target.id]: value });
    }
    function handleDropDown(element){
        let value = element.target.innerHTML;
        console.log(value)
    }

    useEffect(() => {

        if (props.setData) {
            props.setData(searchData);
        }
    });

    useEffect(() => {
        helper.getCustomers({
            deletedToo: true,
            dataSetter: setCustomerData,
        });
        helper.getMachines({
            deletedToo: true,
            dataSetter: setMachineData,
        });
        helper.getMachinetypes({
            dataSetter: setMachineTypeData,
        });
    }, []);

    return (
        <div>
            <div className="Form-section">
                <Form.Group widths='equal'>
                    <SmartInput
                        id="maschine"
                        label="Maschinen"
                        matchingKey="seriennummer"
                        onResultSelect={handleMachineSelect}
                        elements={machineData}
                        setElementId={props.data ? props.data.maschinenid : 0}
                        noResultsMessage="Keine Maschinen gefunden"
                    />
                    <SmartInput
                        id="maschinentyp"
                        label="Maschinentyp"
                        matchingKey="fabrikat"
                        onResultSelect={handleMachineTypeSelect}
                        elements={machineTypeData}
                        setElementId={props.data ? props.data.maschinentypId : 0}
                        noResultsMessage="Keine Maschinentypen gefunden"
                        isRequired={!props.searchView}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <SmartInput
                        id="kunde"
                        label="Kunde"
                        matchingKey="firma"
                        onResultSelect={handleCustomerSelect}
                        elements={customerData}
                        setElementId={props.data ? props.data.kundenid : 0}
                        noResultsMessage="Keine Kunden gefunden"
                    />
                    <Form.Input
                        label="Dummy"
                        className="dummyObject"
                        placeholder="Dummy Placeholder for equal dividing"
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <NumberInput
                        id="startdatum"
                        label="Startdatum - Suchzeitraum"
                        innerLabel="DD.MM.YYYY"
                        value={searchData.startdatum}
                        validate="date"
                        handleChange={handleChange}
                        error={!searchData}
                    />
                    <NumberInput
                        id="enddatum"
                        label="Enddatum - Suchzeitraum"
                        innerLabel="DD.MM.YYYY"
                        value={searchData.enddatum}
                        validate="date"
                        handleChange={handleChange}
                        error={!searchData}
                    />
                </Form.Group>
                <Form.Group>
                    <Dropdown
                        id='typ'
                        placeholder='Auswahl Filter'
                        fluid
                        selection
                        options={options}
                        onChange={handleDropDown}
                    />
                </Form.Group>
            </div>
        </div>
    )
}

export default ServiceSearchFields
