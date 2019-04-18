// @flow

import React from 'react'

import PrivateRoute from "./PrivateRoute";

import Dashboard from "./Dashboard";

import Customer from "./customer/Customer";
import CustomerSearch from "./customer/CustomerSearch";

import Machine from "./machine/Machine";
import MachineType from "./machine/MachineType";
import MachineSearch from "./machine/MachineSearch";

import BuySell from "./transaction/BuySell";
import Rental from "./transaction/Rental";

import Service from "./service/Service";
import ServiceSearch from "./service/ServiceSearch";

export type Props = {
  isAuthenticated: ?boolean,
  token: ?string
};

function AppPrivateRoutes(props: Props) {
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
        path="/machinetype"
        isAuthenticated={props.isAuthenticated}
        token={props.token}
        component={MachineType}
      />
      <PrivateRoute
        path="/service"
        isAuthenticated={props.isAuthenticated}
        token={props.token}
        component={Service}
      />
      <PrivateRoute
        path="/service_search"
        isAuthenticated={props.isAuthenticated}
        token={props.token}
        component={ServiceSearch}
      />
      <PrivateRoute
        path="/rental"
        isAuthenticated={props.isAuthenticated}
        token={props.token}
        component={Rental}
      />
      <PrivateRoute
        path="/machine_buy_sell"
        isAuthenticated={props.isAuthenticated}
        token={props.token}
        component={BuySell}
      />
    </div>
  )
}

export default AppPrivateRoutes
