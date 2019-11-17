import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMedia } from 'the-platform';
import { Slot } from '@wordpress/components';
import { Navbar as BlueprintNavbar, Button } from '@blueprintjs/core';
import { Popover, Position } from '@blueprintjs/core';
import { Menu, MenuItem } from '@blueprintjs/core';
import { Alignment } from '@blueprintjs/core';
import { Logo } from '../../Logo/Logo';
import { useUser } from '../../data/userStore';

export const Navbar: React.FC<{}> = () => {
  const isLarge = useMedia('(min-width: 600px)');
  const history = useHistory();
  const { logout, user } = useUser();
  return (
    <BlueprintNavbar>
      <BlueprintNavbar.Group align={Alignment.LEFT}>
        <BlueprintNavbar.Heading>
          <Logo />
        </BlueprintNavbar.Heading>
        <BlueprintNavbar.Divider />
        <Button
          minimal={true}
          icon="home"
          text={isLarge ? 'Реестры' : null}
          onClick={() => history.push('/')}
        />
      </BlueprintNavbar.Group>
      <BlueprintNavbar.Group align={Alignment.RIGHT}>
        <Slot name="system" />
        <Popover
          content={
            <Menu>
              <MenuItem
                text="logout"
                icon="log-out"
                onClick={() => {
                  logout();
                  history.push('/login');
                }}
              />
            </Menu>
          }
        >
          <span
            style={{ display: 'flex', alignItems: 'center', marginLeft: '0.5em' }}
          >
            <img
              src={
                user.role === 'CLIENT'
                  ? require('../../assets/client-avatar.jpg')
                  : require('../../assets/contractor-avatar.jpg')
              }
              style={{ width: 32, height: 32, borderRadius: '50%' }}
              alt=""
            />
            <span style={{ marginLeft: '0.5em' }}>{user.username}</span>
          </span>
        </Popover>
      </BlueprintNavbar.Group>
    </BlueprintNavbar>
  );
};
