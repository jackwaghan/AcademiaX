'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
export function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;

  let localStoragePersister;
  if (typeof window !== 'undefined') {
    localStoragePersister = createAsyncStoragePersister({
      storage: window.localStorage,
    });
    // Enable persistence only on client
    persistQueryClient({
      queryClient,
      persister: localStoragePersister,
      maxAge: THIRTY_DAYS,
      buster: 'v2.0.0', // Versioning to bust cache
    });
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
