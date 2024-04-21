//Jest tests for useFetchQuestions.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useFetchQuestions } from './useFetchQuestions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { setupServer } from 'msw/node';
import { httpHandlers } from './handlers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const server = setupServer(...httpHandlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useFetchQuestions', () => {
  it('should return mocked response for valid data', async () => {
    const { result } = renderHook(
      () => useFetchQuestions({ category: '11', difficulty: 'easy' }),
      {
        wrapper,
      }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.json()).resolves.toMatchSnapshot();
  });
});
