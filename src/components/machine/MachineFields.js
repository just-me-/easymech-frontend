// @flow

import _ from 'lodash'
import React, {useState, useEffect} from 'react'
import {Search, Header, Form} from 'semantic-ui-react'
import TextareaAutosize from "react-textarea-autosize";
import {NotificationManager} from "react-notifications";

import * as validation from "../validation"
import * as apiTypes from "../../api/machinetype";
import * as apiCustomer from "../../api/customer";

import type {MachineType} from "../../api/machinetype";
import type {Machine} from "../../api/machine";

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
    besitzerId: (props.data && props.data.besitzerId) || "",
    isActive: (props.data && props.data.isActive) || ""
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
      .then((result) => {
        result = apiCustomer.checkResponse(result);
        setCustomer(result)
      })
      .catch(error => {
        console.log("Ups, ein Fehler ist aufgetreten", error);
        NotificationManager.error("Kunden konnten nicht geladen werden", "Bitte überprüfen Sie Ihre Verbindung!");
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
        NotificationManager.error("Maschinentypen konnten nicht geladen werden", "Bitte überprüfen Sie Ihre Verbindung!");
      });
  }

  function handleChange(element, { validate }) {
    let value = element.target.value;
    switch(validate) {
      case "number":
        value = validation.toNumber(value);
        break;
      case "date":
        console.log("2Do DATE VALIDATION")
        break;
      default:
        break;
    }
    setMachineData({...machineData, [element.target.id]: value});
  }

  useEffect(() => {
    const requiredIsValide =
      validation.checkRequired(machineData.seriennummer) &&
      validation.checkRequired(machineData.fahrzeugTypId) &&
      validation.checkRequired(machineData.besitzerId);
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
      <div className="Form-section">
        <Form.Group widths='equal'>
          <Form.Input
            id='seriennummer'
            label='Seriennr.'
            placeholder={props.searchView ? '' : 'Pflichtfeld'}
            value={machineData.seriennummer}
            onChange={handleChange}
          />
          <Form.Input
            id='betriebsdauer'
            label='Betriebsdauer'
            value={machineData.betriebsdauer} validate='number'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field
            control={Search}
            label='Maschienentyp'
            loading={isTypeLoading}
            onResultSelect={handleMachineTypeSelect}
            onSearchChange={_.debounce(handleMachineTypeChange, 500, { leading: true })}
            results={typesResults.map(result => {return {id: result.id, title: result.fabrikat}})}
            value={machineTypeValue}
            noResultsMessage='Keine Maschienentypen gefunden'
            placeholder={props.searchView ? '' : 'Pflichtfeld'}
          />
          <Form.Field
            control={Search}
            label='Besitzer'
            loading={isCustomerLoading}
            onResultSelect={handleCustomerSelect}
            onSearchChange={_.debounce(handleCustomerChange, 500, { leading: true })}
            results={customerResults.map(result => {return {id: result.id, title: result.firma}})}
            value={customerValue}
            noResultsMessage='Keine Kunden gefunden'
            placeholder={props.searchView ? '' : 'Pflichtfeld'}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input
            id='mastnummer'
            label='Mastnr.'
            value={machineData.mastnummer}
            onChange={handleChange}
          />
          <Form.Input
            id='motorennummer'
            label='Motorenr.'
            value={machineData.motorennummer}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input
            id='jahrgang'
            label='Jahrgang'
            value={machineData.jahrgang} validate='date'
            onChange={handleChange}
          />
          <Form.Input
            label='Dummy'
            className='dummyObject'
            placeholder='Dummy Placeholder for equal dividing'
          />
        </Form.Group>

        {props.searchView ||
          <Form.Group widths='equal' className='OneField'>
            <Form.Field
              control={TextareaAutosize}
              id='notiz'
              label='Notizen'
              onChange={handleChange}
              value={machineData.notiz}
            />
          </Form.Group>
        }
      </div>
    </div>
  )
}

export default MachineFields
