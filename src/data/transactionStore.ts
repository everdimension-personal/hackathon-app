import { createStore } from 'hooksy';

export const [useTransactionStore, updateTransaction] = createStore<{
  history: [];
  transaction?: string;
}>({
  history: [],
  transaction: null,
});

Object.assign(window, { updateTransaction });
