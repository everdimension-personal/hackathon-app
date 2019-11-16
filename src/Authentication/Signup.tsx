import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';
import { AuthLayout } from './AuthLayout';

export function Signup() {
  const [sending, setSending] = useState(false);
  return (
    <AuthLayout>
      <form>
        <FormGroup
          label="Придумайте имя пользователя"
          labelFor="username"
          labelInfo="(required)"
        >
          <InputGroup
            id="username"
            name="username"
            disabled={sending}
            placeholder=""
            required
          />
        </FormGroup>

        <FormGroup
          label="Придумайте пароль"
          labelFor="password"
          labelInfo="(required)"
          helperText={
            <span>
              Уже есть аккаунт? <Link to="/login">Войдите</Link>
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

        <Button disabled={sending} loading={sending} type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </AuthLayout>
  );
}
