import { useState, useEffect } from 'react';

interface Options {
  request: () => Promise<any>;
}

export function useRequest({ request }: Options) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    request().then(
      (response) => {
        if (!mounted) {
          return;
        }
        setLoading(false);
        setData(response);
      },
      (error) => {
        setError(error);
      },
    );

    return () => {
      mounted = false;
    };
  }, [request]);

  return {
    loading,
    error,
    data,
  };
}
