// @flow

import React, { useState, useEffect } from 'react';
import {
  Header, Form, Table, Button, Icon, Input,
} from 'semantic-ui-react';

import * as validation from '../shared/validation';

import '../shared/Fields.css';

import type { Service } from '../../api/service';

export type Props = {
  data?: any,
  setData?: any => void,
  setValidState?: boolean => void,
};

function ServiceRow(props: Props) {
  const initialData = {
    id: (props.data && props.data.id) || undefined,
    bezeichnung: (props.data && props.data.bezeichnung) || '',
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
      props.setData(rowData);
    }
  });

  return (
    <Table.Row>
      <Table.Cell width="1">1</Table.Cell>
      <Table.Cell width="7">
        <Input value="Motoröl" />
      </Table.Cell>
      <Table.Cell width="3">
        <Input value="10.00" />
      </Table.Cell>
      <Table.Cell width="2">
        <Input value="10" />
      </Table.Cell>
      <Table.Cell width="3">100.00 CHF</Table.Cell>
      <Table.Cell>
        <Button icon>
          <Icon name="trash alternate" />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}

export default ServiceRow;
