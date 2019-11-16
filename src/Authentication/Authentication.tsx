import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useUserStore } from '../data/userStore';
import { Login } from './Login';
import { Signup } from './Signup';

export const Authentication: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const history = useHistory();
  const [unauthorized, setUnauthorized] = useState(false);
  const [user, setUser] = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
      setUnauthorized(true);
    } else {
      setTimeout(() => {
        console.log('setting user');
        setUser({ username: 'sub-zero' });
        // history.push('/');
      }, 2000);
    }
  }, [history, setUser]);

  if (unauthorized) {
    return (
      <>
        <Route path="/login">
          <Login
            onLogin={(user) => {
              localStorage.setItem('token', 'abc');
              setUser(user);
              setUnauthorized(false);
              history.push('/');
            }}
          />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/signup">signup page</Route>
      </>
    );
  }

  if (!user) {
    return null;
    // return <p>loading...</p>;
  }
  return children;
};
