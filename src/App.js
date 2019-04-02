// @flow

import _ from 'lodash'
import React, { Component } from 'react';
import { Button, Icon, Form, Segment, Table, Checkbox } from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';
import * as api from "./api";
import * as validate from "./validate";

class App extends Component {
  constructor(){
      super();
      this.state = {
        tableData: [],
        addInput: ""
      }
  }

  handleFormChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ addInput: event.target.value });
    }
  };

  addTodo = (event: Event) => {
    event.preventDefault();
    if(validate.checkInput(this.state.addInput)) {
      console.log("Is fine");
    } else {
      console.log("Bad... Input error ftw");
    }
    api
      .addTodo(this.state.addInput)
      .then((result) => {
        this.setState( {addInput: ""} )
      })
      .catch(error => console.log("Ups, ein Fehler ist aufgetreten (add)", error));
  };


  handleCompleteToggle(id, name, isComplete) {
     api
       .updateTodo(id, name, (isComplete ? false : true))
       .then((result) => {
         // ...
       })
       .catch(error => console.log("Ups, ein Fehler ist aufgetreten (update)", error));
  }
  handleDelete(id) {
     api
       .deleteTodo(id)
       .then((result) => {
         // ...
       })
       .catch(error => console.log("Ups, ein Fehler ist aufgetreten (delete)", error));
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Segment inverted>
            <Form inverted style={{width: '250px'}}>
              <Form.Input fluid label='Add todo' placeholder='Add new 2Do'
                          value={this.state.addInput} onChange={this.handleFormChanged}
              />
              <Button type='submit' onClick={this.addTodo}>Add</Button>
            </Form>
          </Segment>

          <Table celled inverted selectable size="small" style={{fontSize: '1rem'}}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="right">Is Complete</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell textAlign="left">Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {_.map(this.state.tableData, ({ id, name, isComplete }) => (
                <Table.Row key={id}>
                  <Table.Cell textAlign="right">
                    <Checkbox toggle checked={(isComplete ? true : false)} onClick={() => this.handleCompleteToggle(id, name, isComplete)}/>
                  </Table.Cell>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell textAlign="left">
                    <Button icon onClick={() => this.handleDelete(id)}>
                      <Icon name='trash alternate' />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

        </header>
      </div>
    );
  }

   updateListData() {
     api
       .getTodos()
       .then((result) => {
         this.setState({
              tableData: result.reverse()
          });
       })
       .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error));
   }

   componentDidMount() {
      this.interval = setInterval(() => this.updateListData(), 500);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

}

export default App;
