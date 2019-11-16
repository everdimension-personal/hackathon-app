import React from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar as BlueprintNavbar, Button } from '@blueprintjs/core';
import { Alignment } from '@blueprintjs/core';
import { Logo } from '../../Logo/Logo';

export const Navbar: React.FC<{}> = () => {
  const history = useHistory();
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
          text="Home"
          onClick={() => history.push('/')}
        />
        <Button minimal={true} icon="crown" />
      </BlueprintNavbar.Group>
    </BlueprintNavbar>
  );
};
