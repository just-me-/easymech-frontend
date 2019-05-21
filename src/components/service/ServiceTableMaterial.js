// @flow

import _ from 'lodash';
import React from 'react';
import {
  Header, Form, Table, Button, Icon,
} from 'semantic-ui-react';

import ServiceRow from './ServiceRow';

import type { Material } from '../../api/service';

export type Props = {
  materialList: Array<Material>,
  materialAddRow: Material,
  removeMaterial: number => void,
  editMaterial: (number, Material) => void,
  handleMaterial: (
    { target: { value: string, id: string } },
    { validate: string, value: string },
  ) => void,
  addMaterial: () => void,
};

function ServiceTableMaterial(props: Props) {
  return (
    <React.Fragment>
      <Header as="h2">Material</Header>
      <div className="Form-section">
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Pos</Table.HeaderCell>
              <Table.HeaderCell>Beschreibung</Table.HeaderCell>
              <Table.HeaderCell>Stückpreis</Table.HeaderCell>
              <Table.HeaderCell>Anzahl</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell>Löschen</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {_.map(props.materialList, (row, index) => (
              <ServiceRow
                index={index}
                key={index}
                data={row}
                rmCall={props.removeMaterial}
                setData={props.editMaterial}
                type="material"
              />
            ))}

            <Table.Row>
              <Table.Cell />
              <Table.Cell>
                <Form.Input
                  id="bezeichnung"
                  value={props.materialAddRow.bezeichnung}
                  onChange={props.handleMaterial}
                />
              </Table.Cell>
              <Table.Cell>
                <Form.Input
                  id="stueckpreis"
                  value={props.materialAddRow.stueckpreis}
                  onChange={props.handleMaterial}
                  validate="number"
                />
              </Table.Cell>
              <Table.Cell>
                <Form.Input
                  id="anzahl"
                  value={props.materialAddRow.anzahl}
                  onChange={props.handleMaterial}
                  validate="number"
                />
              </Table.Cell>
              <Table.Cell />
              <Table.Cell>
                <Button icon onClick={props.addMaterial}>
                  <Icon name="add" />
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </React.Fragment>
  );
}

export default ServiceTableMaterial;
