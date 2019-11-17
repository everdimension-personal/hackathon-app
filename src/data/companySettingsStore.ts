import { createStore } from 'hooksy';

export const [useCompanySettings, updateCompanySettings] = createStore<{
  [key: string]: Object;
}>({});
