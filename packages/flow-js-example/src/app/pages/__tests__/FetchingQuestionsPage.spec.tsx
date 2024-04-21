/* eslint-disable @typescript-eslint/ban-ts-comment */

import { render, waitFor, screen } from '@testing-library/react';
import { FetchingQuestionsPage } from '../FetchingQuestionsPage';
import * as fetchQuestions from '../../queries/useFetchQuestions';

describe('FetchingQuestionsPage tests', () => {
  it('should render error page if error', () => {
    const spy = jest.spyOn(fetchQuestions, 'useFetchQuestions');
    // @ts-expect-error
    spy.mockReturnValue({ isError: true });

    const { baseElement } = render(<FetchingQuestionsPage />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render empty page if empy', async () => {
    const spy = jest.spyOn(fetchQuestions, 'useFetchQuestions');
    spy.mockReturnValue({
      // @ts-expect-error
      data: { json: () => Promise.resolve({ results: [] }) },
    });

    render(<FetchingQuestionsPage />);

    await waitFor(() => {
      expect(screen.getByTestId('emptyQuestionsContainer')).toBeInTheDocument();
    });
  });

  it('should render loader', async () => {
    const spy = jest.spyOn(fetchQuestions, 'useFetchQuestions');

    // @ts-expect-error
    spy.mockReturnValue({
      isLoading: true,
    });

    const { baseElement } = render(<FetchingQuestionsPage />);

    expect(baseElement).toMatchSnapshot();
  });
});
