import { useCallback } from 'react';
import { createStore } from 'hooksy';

export interface UserData {
  username: string;
  role: 'CLIENT' | 'CONTRACTOR';
}

export const [useUserStore, updateUser] = createStore<UserData>(null); // user store is defined the same way as before

export function useUser() {
  const [user, setUser] = useUserStore();

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
  }, [setUser]);

  const login = useCallback(
    (username: string) => {
      setUser({ username });
    },
    [setUser],
  );

  return {
    user,
    logout,
    login,
  };
}
