import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';
import { AuthLayout } from './AuthLayout';

interface Props {
  onLogin: (user: any) => void;
}
export const Login: React.FC<Props> = ({ onLogin }) => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  return (
    <AuthLayout>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const username = (form.elements as any).username.value;
          const password = (form.elements as any).password.value;
          setSending(true);
          setTimeout(() => {
            setSending(false);
            onLogin({ username });
          }, 2000);
        }}
      >
        <FormGroup
          label="Имя пользователя"
          labelFor="username"
          labelInfo="(required)"
        >
          <InputGroup
            id="username"
            disabled={sending}
            name="username"
            placeholder=""
            required
          />
        </FormGroup>

        <FormGroup
          label="Пароль"
          labelFor="password"
          labelInfo="(required)"
          helperText={
            <span>
              Нет аккаунта? <Link to="/signup">Зарегистрируйтесь</Link>
            </span>
          }
        >
          <InputGroup
            type="password"
            id="password"
            name="password"
            disabled={sending}
            placeholder=""
            required
          />
        </FormGroup>
        <Button
          disabled={sending}
          loading={sending}
          type="submit"
          style={{ width: '100%' }}
        >
          Войти
        </Button>
      </form>
    </AuthLayout>
  );
};
