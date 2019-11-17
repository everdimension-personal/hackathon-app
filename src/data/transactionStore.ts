import { createStore } from 'hooksy';

export const [useTransactionStore, updateTransaction] = createStore<{
  history: string[];
  transaction?: string;
}>({
  history: [],
  transaction: null,
});

Object.assign(window, { updateTransaction });
