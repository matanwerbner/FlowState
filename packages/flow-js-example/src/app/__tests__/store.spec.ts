// jest tests for store.ts

import { act } from '@testing-library/react';
import { useGameStore } from '../store';

describe('Store', () => {
  beforeEach(() => {
    useGameStore.getState().initializeStore({});
    jest.resetAllMocks();
  });

  it('should trigger pickCategory event and update state only if category is set', async () => {
    const { triggerEvent } = useGameStore.getState();
    expect(useGameStore.getState().currentState).toBe('pickCategory');
    await expect(triggerEvent('categoryPicked')).rejects.toMatchSnapshot();
    expect(useGameStore.getState().currentState).toBe('pickCategory');
    await act(
      async () => await triggerEvent('categoryPicked', { category: '9' })
    );
    expect(useGameStore.getState().currentState).toBe('pickDifficulty');
  });

  it('should trigger difficultyPicked event and update state only if category and difficulty are set', async () => {
    const { triggerEvent, initializeStore } = useGameStore.getState();
    initializeStore({ state: 'pickDifficulty', data: { category: '9' } });

    expect(useGameStore.getState().currentState).toBe('pickDifficulty');

    await act(
      async () =>
        await triggerEvent('difficultyPicked', {
          difficulty: 'easy',
          category: '9',
        })
    );
    expect(useGameStore.getState().currentState).toBe('fetchQuestions');
  });

  it("should trigger questionsFetched event and update state to 'gameInProgress'", async () => {
    const { initializeStore, triggerEvent } = useGameStore.getState();
    initializeStore({
      state: 'pickDifficulty',
      data: {
        category: '9',
      },
    });

    await act(
      async () =>
        await triggerEvent('difficultyPicked', {
          difficulty: 'easy',
        })
    );

    expect(useGameStore.getState().currentState).toBe('fetchQuestions');

    await expect(triggerEvent('questionsFetched')).rejects.toMatchSnapshot();

    await act(
      async () => await triggerEvent('questionsFetched', { questions: [] })
    );
    expect(useGameStore.getState().currentState).toBe('gameInProgress');
  });
});
