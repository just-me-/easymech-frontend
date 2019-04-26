// @flow

import _ from 'lodash'
import React, {useState, useEffect} from 'react'
import {Search, Header, Form} from 'semantic-ui-react'
import {NotificationManager} from "react-notifications";

import * as validation from "../validation"
import * as apiTypes from "../../api/machinetype";
import * as apiCustomer from "../../api/customer";

import type {MachineType} from "../../api/machinetype";
import type { Machine} from "../../api/machine";

export type Props = {
  data?: Machine,
  setData?: (Machine) => void,
  setValidState?: (boolean) => void,
  searchView?: boolean,
  machineTyp?: MachineType
};

function MachineFields(props: Props) {

  const initialData = {
    id: (props.data && props.data.id) || undefined,
    seriennummer: (props.data && props.data.seriennummer) || "",
    mastnummer: (props.data && props.data.mastnummer) || "",
    motorennummer: (props.data && props.data.motorennummer) || "",
    betriebsdauer: (props.data && props.data.betriebsdauer) || "",
    jahrgang: (props.data && props.data.jahrgang) || "",
    notiz: (props.data && props.data.notiz) || "",
    fahrzeugTypId: (props.data && props.data.fahrzeugTypId) || "",
    isActive: (props.data && props.data.isActive) || "",
    besitzerId: (props.data && props.data.besitzerId) || ""
  };

  const [machineData, setMachineData] = useState(initialData);

  const [machineTypes, setMachineTypes] = useState([]);
  const [typesResults, setTypeResults] = useState([]);
  const [machineTypeValue,setMachineTypeValue] = useState();

  const [customer, setCustomer] = useState([]);
  const [customerResults, setCustomerResults] = useState([]);
  const [customerValue,setCustomerValue] = useState();

  const [isTypeLoading,setTypeLoading] = useState(false);
  const [isCustomerLoading,setCustomerLoading] = useState(false);

    function resetMachineTypeSearchComponent(){
        setTypeLoading(false);
        setTypeResults([]);
        setMachineTypeValue("");
    }
    function resetCustomerSearchComponent(){
        setCustomerLoading(false);
        setCustomerResults([]);
        setCustomerValue("");
    }

    function handleMachineTypeSelect(e, { result }){
        machineData.fahrzeugTypId = result.id;
        setMachineTypeValue(result.title);
    }

    function handleCustomerSelect(e, { result }){
        machineData.besitzerId = result.id;
        setCustomerValue(result.title);
    }

    function handleMachineTypeChange(e, { value }){
        setTypeLoading(true);
        setMachineTypeValue(e.target.value);
        setTimeout(() => {
            if (value.length < 1) return resetMachineTypeSearchComponent();

            const re = new RegExp(_.escapeRegExp(value), 'i');
            const isMatch = typesResults => re.test(typesResults.fabrikat);

            setTypeLoading(false);
            setTypeResults(_.filter(machineTypes, isMatch));
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
            .then((result) =>{
                result = apiCustomer.checkResponse(result);
                setCustomer(result)
            })
            .catch(error => {
                console.log("Ups, ein Fehler ist aufgetreten", error);
                NotificationManager.error("Kunden konnten nicht geladen werden", "Bitte überprüfen Sie ihre Verbindungen!");
            });
    }

  function getMachineTypesName(){
      apiTypes
          .getMachineTypes()
          .then((result) => {
              result = apiTypes.checkResponse(result);
              setMachineTypes(result);
          })
          .catch(error => {
              console.log("Ups, ein Fehler ist aufgetreten", error);
              NotificationManager.error("Maschinentypen konnten nicht geladen werden", "Bitte überprüfen Sie ihre Verbindungen!");
          });
  }

  function handleChange(element) {
    setMachineData({...machineData, [element.target.id]: element.target.value});
  }

  useEffect(() => {
    const requiredIsValide = validation.checkRequired(machineData.seriennummer);
    if(props.setValidState) {
      props.setValidState(requiredIsValide);
    }
    if(props.setData) {
      machineData.isActive = true;
      props.setData(machineData);
    }
  });

  useEffect(() => {
    setCustomer(getCustomersList());
    setMachineTypes(getMachineTypesName());
  }, []);

  return (
    <div>
      <Header as='h2'>Details Maschine</Header>
      <div className="Form-section">
        <Form.Group widths='equal'>
          <Form.Input
            id='seriennummer'
            label='Seriennummer'
            placeholder={props.searchView ? '' : 'Pflichtfeld'}
            value={machineData.seriennummer}
            onChange={handleChange}
          />
          <Search
            label='Fahrzeugtyp'
            loading={isTypeLoading}
            onResultSelect={handleMachineTypeSelect}
            onSearchChange={_.debounce(handleMachineTypeChange, 500, { leading: true })}
            results={typesResults.map(result => {return {id: result.id, title: result.fabrikat}})}
            value={machineTypeValue}
          />
          <Search
            label='Kunden'
            loading={isCustomerLoading}
            onResultSelect={handleCustomerSelect}
            onSearchChange={_.debounce(handleCustomerChange, 500, { leading: true })}
            results={customerResults.map(result => {return {id: result.id, title: result.firma}})}
            value={customerValue}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            id='mastnummer'
            label='Mastnummer'
            value={machineData.mastnummer}
            onChange={handleChange}
          />
          <Form.Input
            id='motorennummer'
            label='Motorennummer'
            value={machineData.motorennummer}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths='equal'>
         <Form.Input
           id='betriebsdauer'
           label='Betriebsdauer'
           value={machineData.betriebsdauer}
           onChange={handleChange}
         />
         <Form.Input
           id='jahrgang'
           label='Jahrgang'
           value={machineData.jahrgang}
           onChange={handleChange}
         />
        </Form.Group>

        <Form.Group widths='equal' className="OneField">
         <Form.Input
           id='notiz'
           label='Notizen'
           value={machineData.notiz}
           onChange={handleChange}
         />
        </Form.Group>
      </div>
    </div>
  )
}

export default MachineFields
