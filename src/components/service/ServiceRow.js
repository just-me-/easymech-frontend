// @flow

import React, { useState, useEffect } from 'react';
import {
  Table, Button, Icon, Input,
} from 'semantic-ui-react';

import * as validation from '../shared/validation';

import '../shared/Fields.css';

export type Props = {
  key?: number,
  type: string,
  data?: any,
  rmCall: number => void,
  setData: (any, ...any) => void,
  index?: number,
};

function ServiceRow(props: Props) {
  const initialData = props.type === 'workstep'
    ? {
      desc: (props.data && props.data.bezeichnung) || '',
      price: (props.data && props.data.stundensatz || "0") || '',
      unit: (props.data && props.data.dauer || "0") || '',
    }
    : {
      desc: (props.data && props.data.bezeichnung) || '',
      price: (props.data && props.data.preis || "0") || '',
      unit: (props.data && props.data.anzahl || "0") || '',
    };

  const [rowData, setRowData] = useState(initialData);

  function handleChange(element, { validate }) {
    let value = element.target.value;
    if (validate && validate === 'number') {
      value = validation.toNumber(value);
    }
    if (validate && validate === 'float') {
      value = validation.toFloat(value);
    }
    if (validate && validate === 'currency') {
      value = validation.toCurrency(value);
    }
    setRowData({ ...rowData, [element.target.id]: value });
  }

  useEffect(
    () => {
      if (props.setData) {
        const data = props.type === 'workstep'
          ? {
            bezeichnung: rowData.desc,
            stundensatz: rowData.price,
            dauer: rowData.unit,
          }
          : {
            bezeichnung: rowData.desc,
            preis: rowData.price,
            anzahl: rowData.unit,
          };
        props.setData(props.index, data);
      }
    },
    [rowData],
  );

  return (
    <Table.Row>
      <Table.Cell width="1">{props.index + 1}</Table.Cell>
      <Table.Cell width="7">
        <Input id="desc" value={rowData.desc} onChange={handleChange} />
      </Table.Cell>
      <Table.Cell width="3">
        <Input id="price" value={rowData.price} onChange={handleChange} validate="number" />
      </Table.Cell>
      <Table.Cell width="2">
        <Input id="unit" value={rowData.unit} onChange={handleChange} validate="number" />
      </Table.Cell>
      <Table.Cell width="3">
        {validation.toCurrency(parseFloat(rowData.price) * parseInt(rowData.unit))}
        {' CHF'}
      </Table.Cell>
      <Table.Cell>
        <Button icon onClick={() => props.rmCall(parseInt(props.index))}>
          <Icon name="trash alternate" />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}

export default ServiceRow;
