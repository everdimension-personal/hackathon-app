import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useUserStore } from '../data/userStore';
import { Login } from './Login';
import { Signup } from './Signup';

export const Authentication: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const history = useHistory();
  // const [detecting, setDetecting] = useState(true);
  // const [unauthorized, setUnauthorized] = useState(false);
  const [user, setUser] = useUserStore();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setAuthorized(false);
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
      setAuthorized(false);
      setLoading(false);
    } else {
      setTimeout(() => {
        console.log('setting user');
        setLoading(false);
        setAuthorized(true);
        setUser(
          token === 'client'
            ? { username: 'Юля Паламарчук', role: 'CLIENT' }
            : {
                username: 'Денис Васин',
                role: 'CONTRACTOR',
              },
        );
        // history.push('/');
      }, 2000);
    }
  }, [history, setUser]);

  if (!authorized && !loading) {
    return (
      <>
        <Route path="/login">
          <Login
            onLogin={(user) => {
              localStorage.setItem('token', user.username);
              setUser(user);
              setAuthorized(true);
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
