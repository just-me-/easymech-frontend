// @flow

import React, { useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../resources/Logo.png';

export type Props = {
  signout: (callback: () => void) => void,
  history: { push: string => void },
};

function AppMenu(props: Props) {
  const [activeItem, setActiveItem] = useState('dashboard');

  function handleMenuClick(e, { name }) {
    setActiveItem(name);
  }

  return (
    <Menu vertical color="red" className="Main-navigation">
      <Menu.Item id="Logo">
        <img src={logo} alt="EasyMech Logo" />
      </Menu.Item>

      <Menu.Item
        content="Übersicht"
        name="dashboard"
        active={activeItem === 'dashboard'}
        onClick={handleMenuClick}
        as={Link}
        to="/dashboard"
        icon="clipboard list"
      />

      <Menu.Item>
        <Menu.Header>
          <div onClick={e => handleMenuClick(e, { name: 'search_customer' })}>
            <Link
              to={{
                pathname: '/customer_search',
                state: { listRedirect: true },
              }}
            >
              <Icon name="address book outline" />
              Kunden
            </Link>
          </div>
        </Menu.Header>

        <Menu.Menu>
          <Menu.Item
            content="Erfassen"
            name="add_customer"
            active={activeItem === 'add_customer'}
            onClick={handleMenuClick}
            as={Link}
            to="/customer"
          />
          <Menu.Item
            content="Suchen"
            name="search_customer"
            active={activeItem === 'search_customer'}
            onClick={handleMenuClick}
            as={Link}
            to="/customer_search"
          />
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>
          <Icon name="truck" />
          <Link to={{ pathname: '/machine_search', state: { listRedirect: true } }}>Maschinen</Link>
        </Menu.Header>
        <Menu.Menu>
          <Menu.Item
            content="Erfassen"
            name="add_machine"
            active={activeItem === 'add_machine'}
            onClick={handleMenuClick}
            as={Link}
            to="/machine"
          />
          <Menu.Item
            content="Suchen"
            name="search_machine"
            active={activeItem === 'search_machine'}
            onClick={handleMenuClick}
            as={Link}
            to="/machine_search"
          />
          <Menu.Item
            content="Maschinentypen verwalten"
            name="machinetype"
            active={activeItem === 'machinetype'}
            onClick={handleMenuClick}
            as={Link}
            to="/machinetype"
          />
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>
          <Icon name="cogs" />
          Dienstleistungen
        </Menu.Header>
        <Menu.Menu>
          <Menu.Item
            content="Reparatur und Service erfassen"
            name="add_service"
            active={activeItem === 'add_service'}
            onClick={handleMenuClick}
            as={Link}
            to="/service"
          />
          <Menu.Item
            content="Vermietung erfassen"
            name="add_rental"
            active={activeItem === 'add_rental'}
            onClick={handleMenuClick}
            as={Link}
            to="/rental"
          />
          <Menu.Item
            content="Ver- und Ankauf erfassen"
            name="sell_machine"
            active={activeItem === 'sell_machine'}
            onClick={handleMenuClick}
            as={Link}
            to="/machine_buy_sell"
          />

          <Menu.Item
            content="Suchen"
            name="search_service"
            active={activeItem === 'search_service'}
            onClick={handleMenuClick}
            as={Link}
            to="/service_search"
          />
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item
        name="logout"
        active={activeItem === 'logout'}
        content="Abmelden"
        onClick={event => {
          event.preventDefault();
          props.signout(() => props.history.push('/'));
        }}
        href="/logout"
        icon="sign-out"
      />
    </Menu>
  );
}

export default AppMenu;
