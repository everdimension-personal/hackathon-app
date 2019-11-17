import ky, { Input, Options } from 'ky';
import { Position, Toaster } from '@blueprintjs/core';

/** Singleton toaster instance. Create separate instances for different options. */
const SystemToaster = Toaster.create({
  position: Position.BOTTOM_LEFT,
});

export function post(input: Input, options?: Options) {
  return ky
    .post(input, options)
    .json()
    .catch((error) => {
      SystemToaster.show({ message: 'Ошибка запроса' });
      throw error;
    });
}
