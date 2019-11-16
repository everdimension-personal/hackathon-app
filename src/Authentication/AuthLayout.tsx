import React from 'react';
import { Logo } from '../Logo/Logo';

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 300, flex: '1 0 300px' }}>
        <div style={{ textAlign: 'center', padding: 30 }}>
          <Logo></Logo>
        </div>

        {children}
      </div>
    </div>
  );
};
