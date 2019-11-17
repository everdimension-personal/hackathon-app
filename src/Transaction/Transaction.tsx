import React, { useEffect } from 'react';
import { useMedia } from 'the-platform';
import { Fill } from '@wordpress/components';
import ky from 'ky';
import { Position, Toaster } from '@blueprintjs/core';
import { Spinner } from '@blueprintjs/core';
import { useTransactionStore } from '../data/transactionStore';
import { ServerResponse } from '../types';

function poll(request, shouldStop) {
  return new Promise((resolve) => {
    function makeRequest() {
      request().then(
        (response) => {
          if (!shouldStop(response)) {
            setTimeout(makeRequest, 3000);
          } else {
            resolve(response);
          }
        },
        () => {
          TransactionToaster.show({
            intent: 'danger',
            message: 'Ошибка опроса',
          });
        },
      );
    }
    makeRequest();
  });
}

/** Singleton toaster instance. Create separate instances for different options. */
const TransactionToaster = Toaster.create({
  position: Position.BOTTOM_RIGHT,
});

export const Transaction: React.FunctionComponent<{}> = () => {
  const [transactions, updateTransactions] = useTransactionStore();
  const isLarge = useMedia('(min-width: 600px)');

  const { transaction } = transactions;

  useEffect(() => {
    if (transaction) {
      TransactionToaster.show({
        intent: 'primary',
        message: (
          <span>
            Создана{' '}
            <a href={`http://163.172.139.34:8877/api/tx?txId=${transaction}`}>
              транзакция
            </a>
          </span>
        ),
      });
    }
  }, [transaction]);
  useEffect(() => {
    if (!transaction) {
      return;
    }
    const request = () => ky.get(`/api/tx?txId=${transaction}`).json();
    poll(request, (response) => {
      if (
        response.result &&
        (response.result.kind === 'SUCCESS' ||
          response.result.kind === 'FAILURE')
      ) {
        return true;
      }
    }).then(({ result }: ServerResponse) => {
      console.log('done polling');
      if (result.kind === 'SUCCESS') {
        updateTransactions({
          history: [...transactions.history, transaction],
          transaction: null,
        });
      }
    });
  }, [transaction, transactions.history, updateTransactions]);
  if (!transaction) {
    return null;
  }
  return (
    <Fill name="system">
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {isLarge ? (
          <span style={{ marginRight: '0.5em' }}>Transaction in progress</span>
        ) : null}
        <span>
          <Spinner size={Spinner.SIZE_SMALL} />
        </span>
      </span>
    </Fill>
  );
};
