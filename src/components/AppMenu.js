// @flow

import React, {useState} from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import {Link} from "react-router-dom";

import logo from "../resources/Logo.png"

function AppMenu(props) {
  const [activeItem, setActiveItem] = useState("dashboard");

  function handleMenuClick(e, { name }) {
    setActiveItem(name);
  }

  return (
    <Menu vertical color="red" className="Main-navigation">
      <Menu.Item id="Logo">
        <img src={logo} alt="EasyMech Logo"/>
      </Menu.Item>

      <Menu.Item
        name='dashboard'
        active={activeItem === 'dashboard'}
        onClick={handleMenuClick}
        as={Link}
        to="/dashboard"
        icon="clipboard list"
      />

      <Menu.Item>
        <Menu.Header>
          <Icon name='address book outline' />
          Kunden
        </Menu.Header>
        <Menu.Menu>
          <Menu.Item
            content="Erstellen"
            name='add_customer'
            active={activeItem === 'add_customer'}
            onClick={handleMenuClick}
            as={Link}
            to="/customer"
          />
          <Menu.Item
            content="Suchen"
            name='search_customer'
            active={activeItem === 'search_customer'}
            onClick={handleMenuClick}
            as={Link}
            to="/customer_search"
          />
        </Menu.Menu>
      </Menu.Item>

        <Menu.Item>
            <Menu.Header>
                <Icon name='truck' />
                Maschinen
            </Menu.Header>
            <Menu.Menu>
                <Menu.Item
                    content="Erstellen"
                    name='add_machine'
                    active={activeItem === 'add_machine'}
                    onClick={handleMenuClick}
                    as={Link}
                    to="/machine"
                />

                <Menu.Item
                    content="Suchen"
                    name='search_customer'
                    active={activeItem === 'search_machine'}
                    onClick={handleMenuClick}
                    as={Link}
                    to="/machine_search"
                />

                <Menu.Item
                    content="Maschinentyp hinzufügen"
                    name='add_machinetyp'
                    active={activeItem === 'add_machinetyp'}
                    onClick={handleMenuClick}
                    as={Link}
                    to="/machinetyp"
                />
                <Menu.Item
                    content="Maschinentyp suchen"
                    name='search_machinetyp'
                    active={activeItem === 'search_machinetyp'}
                    onClick={handleMenuClick}
                    as={Link}
                    to="/machinetyp_search"
                />
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
            <Menu.Header>
                <Icon name='dollar' />
                Dienstleistungen
            </Menu.Header>
            <Menu.Menu>
                <Menu.Item
                    content="Dienstleistung erfassen"
                    name='add_action'
                    active={activeItem === 'add_action'}
                    onClick={handleMenuClick}
                    as={Link}
                    to="/action"
                />

                <Menu.Item
                    content="Dienstleistungen suchen"
                    name='search_action'
                    active={activeItem === 'search_action'}
                    onClick={handleMenuClick}
                    as={Link}
                    to="/action_search"
                />

                <Menu.Item
                    content="Vermietung"
                    name='add_rental'
                    active={activeItem === 'add_rental'}
                    onClick={handleMenuClick}
                    as={Link}
                    to="/rental"
                />
                <Menu.Item
                    content="Verkauf"
                    name='sell_machine'
                    active={activeItem === 'sell_machine'}
                    onClick={handleMenuClick}
                    as={Link}
                    to="/machine_sell"
                />
                <Menu.Item
                    content="Ankauf"
                    name='buy_machine'
                    active={activeItem === 'buy_machine'}
                    onClick={handleMenuClick}
                    as={Link}
                    to="/machine_buy"
                />
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item
        name='logout'
        active={activeItem === 'logout'}
        content="Abmelden"
        onClick={event => {
          event.preventDefault();
          props.signout(() => props.history.push("/"));
        }}
        href="/logout"
        icon="sign-out"
      />
    </Menu>
  )
}

export default AppMenu
