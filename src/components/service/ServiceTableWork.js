// @flow

import _ from 'lodash';
import React from 'react';
import {
  Header, Form, Table, Button, Icon,
} from 'semantic-ui-react';

import ServiceRow from './ServiceRow';

import type { WorkStep } from '../../api/service';

export type Props = {
  workStepList: Array<WorkStep>,
  workStepAddRow: WorkStep,
  removeWorkStep: number => void,
  editWorkStep: (number, WorkStep) => void,
  handleWorkStep: (
    { target: { value: string, id: string } },
    { validate: string, value: string },
  ) => void,
  addWorkStep: () => void,
};

function ServiceTableWork(props: Props) {
  return (
    <React.Fragment>
      <Header as="h2">Arbeit</Header>
      <div className="Form-section">
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Pos</Table.HeaderCell>
              <Table.HeaderCell>Beschreibung</Table.HeaderCell>
              <Table.HeaderCell>Stundensatz</Table.HeaderCell>
              <Table.HeaderCell>Stunden</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell>Löschen</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {_.map(props.workStepList, (row, index) => (
              <ServiceRow
                index={index}
                key={index}
                data={row}
                rmCall={props.removeWorkStep}
                setData={props.editWorkStep}
                type="workstep"
              />
            ))}

            <Table.Row>
              <Table.Cell />
              <Table.Cell>
                <Form.Input
                  id="bezeichnung"
                  value={props.workStepAddRow.bezeichnung}
                  onChange={props.handleWorkStep}
                />
              </Table.Cell>
              <Table.Cell>
                <Form.Input
                  id="stundenansatz"
                  value={props.workStepAddRow.stundenansatz}
                  onChange={props.handleWorkStep}
                  validate="number"
                />
              </Table.Cell>
              <Table.Cell>
                <Form.Input
                  id="arbeitsstunden"
                  value={props.workStepAddRow.arbeitsstunden}
                  onChange={props.handleWorkStep}
                  validate="number"
                />
              </Table.Cell>
              <Table.Cell />
              <Table.Cell>
                <Button icon onClick={props.addWorkStep}>
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

export default ServiceTableWork;
