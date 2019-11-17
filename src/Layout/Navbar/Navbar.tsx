import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMedia } from 'the-platform';
import { Slot } from '@wordpress/components';
import { Navbar as BlueprintNavbar, Button } from '@blueprintjs/core';
import { Alignment } from '@blueprintjs/core';
import { Logo } from '../../Logo/Logo';
import { useUser } from '../../data/userStore';

export const Navbar: React.FC<{}> = () => {
  const isLarge = useMedia('(min-width: 600px)');
  const history = useHistory();
  const { logout } = useUser();
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
        <Button
          style={{ marginLeft: '0.5em' }}
          icon="log-out"
          onClick={() => {
            logout();
            history.push('/login');
          }}
        >
          {isLarge ? 'logout' : null}
        </Button>
      </BlueprintNavbar.Group>
    </BlueprintNavbar>
  );
};
