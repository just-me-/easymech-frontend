// @flow

import React from 'react'

import PrivateRoute from "./PrivateRoute";

import Dashboard from "./Dashboard";
import Customer from "./customer/Customer";
import CustomerSearch from "./customer/CustomerSearch";
import CustomerList from "./customer/CustomerList";
import Machine from "./machine/Machine";
import Machinetype from "./machine/Machinetype";
import Action from "./action/Action";
import ActionSearch from "./action/ActionSearch";
import Rental from "./transaction/Rental";
import Sell from "./transaction/Sell";
import Buy from "./transaction/Buy";
import MachinetypeSearch from "./machine/MachinetypeSearch";
import MachineSearch from "./machine/MachineSearch";

function AppPrivateRoutes(props) {
  return (
    <div>

      <PrivateRoute
        path="/dashboard"
        isAuthenticated={props.isAuthenticated}
        token={props.token}
        component={Dashboard}
      />
      <PrivateRoute
        path="/customer"
        isAuthenticated={props.isAuthenticated}
        token={props.token}
        component={Customer}
      />
      <PrivateRoute
        path="/customer_search"
        isAuthenticated={props.isAuthenticated}
        token={props.token}
        component={CustomerSearch}
      />
      <PrivateRoute
        path="/customer_list"
        isAuthenticated={props.isAuthenticated}
        token={props.token}
        component={CustomerList}
      />
      <PrivateRoute
          path="/machine"
          isAuthenticated={props.isAuthenticated}
          token={props.token}
          component={Machine}
      />
      <PrivateRoute
          path="/machine_search"
          isAuthenticated={props.isAuthenticated}
          token={props.token}
          component={MachineSearch}
      />
      <PrivateRoute
          path="/machinetyp"
          isAuthenticated={props.isAuthenticated}
          token={props.token}
          component={Machinetype}
      />
      <PrivateRoute
          path="/machinetyp_search"
          isAuthenticated={props.isAuthenticated}
          token={props.token}
          component={MachinetypeSearch}
      />
      <PrivateRoute
          path="/action"
          isAuthenticated={props.isAuthenticated}
          token={props.token}
          component={Action}
      />
      <PrivateRoute
          path="/action_search"
          isAuthenticated={props.isAuthenticated}
          token={props.token}
          component={ActionSearch}
      />
      <PrivateRoute
          path="/rental"
          isAuthenticated={props.isAuthenticated}
          token={props.token}
          component={Rental}
      />
      <PrivateRoute
          path="/machine_buy"
          isAuthenticated={props.isAuthenticated}
          token={props.token}
          component={Buy}
      />
      <PrivateRoute
          path="/machine_sell"
          isAuthenticated={props.isAuthenticated}
          token={props.token}
          component={Sell}
      />
    </div>
  )
}

export default AppPrivateRoutes
