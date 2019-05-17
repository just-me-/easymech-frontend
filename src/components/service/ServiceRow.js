// @flow

import React, { useState, useEffect } from 'react';
import {
  Header, Form, Table, Button, Icon, Input,
} from 'semantic-ui-react';

import * as validation from '../shared/validation';

import '../shared/Fields.css';

import type { Service } from '../../api/service';

export type Props = {
  key: number,
  type: string,
  data?: any,
  rmCall: number => void,
  setData: any => void,
};

function ServiceRow(props: Props) {
  const initialData = props.type === 'workstep' ? {
    desc: (props.data && props.data.bezeichnung) || '',
    price: (props.data && props.data.stundensatz) || '',
    unit: (props.data && props.data.dauer) || '',
  } : {
    desc: (props.data && props.data.bezeichnung) || '',
    price: (props.data && props.data.preis) || '',
    unit: (props.data && props.data.anzahl) || '',
  };

  const [rowData, setRowData] = useState(initialData);

  function handleChange(element, { validate }) {
    let value = element.target.value;
    if (validate && (validate === 'number')) {
      value = validation.toNumber(value);
    }
    setRowData({ ...rowData, [element.target.id]: value });
  }

  useEffect(() => {
    if (props.setData) {
      // 2Do "rückparsing"...
      props.setData(rowData);
    }
  });

  return (
    <Table.Row>
      <Table.Cell width="1">{props.index + 1}</Table.Cell>
      <Table.Cell width="7">
        <Input value={rowData.desc} />
      </Table.Cell>
      <Table.Cell width="3">
        <Input value={rowData.price} />
      </Table.Cell>
      <Table.Cell width="2">
        <Input value={rowData.unit} />
      </Table.Cell>
      <Table.Cell width="3">{rowData.price * rowData.unit}</Table.Cell>
      <Table.Cell>
        <Button icon onClick={rowData.rmCall}>
          <Icon name="trash alternate" />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}

export default ServiceRow;
