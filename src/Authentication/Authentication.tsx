import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUserStore } from '../data/userStore';

export const Authentication: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [unauthorized, setUnauthorized] = useState(false);
  const [user, setUser] = useUserStore();

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        // setUser({ username: 'Johny' });
        setUnauthorized(true);
      }, 2000);
    }
  });
  if (unauthorized) {
    return (
      <>
        <Redirect to="/login" />
        <Route path="/login">login now, please :)</Route>
      </>
    );
  }
  if (!user) {
    return <p>loading...</p>;
  }
  return children;
};
