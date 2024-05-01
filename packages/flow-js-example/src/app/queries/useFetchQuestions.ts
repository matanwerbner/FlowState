import { useQuery } from '@tanstack/react-query';
import { GameContext } from '../lib/types';

export const useFetchQuestions = (
  context: Pick<GameContext, 'category' | 'difficulty'>
) =>
  useQuery({
    queryKey: ['FetchQuestions'],
    networkMode: 'always',
    queryFn: () => {
      const queryParams = new URLSearchParams({
        amount: '10',
        type: 'boolean',
      });
      if (context.category !== '') {
        queryParams.append('category', context.category);
      }
      if (context.difficulty !== '') {
        queryParams.append('difficulty', context.difficulty);
      }

      return fetch(`https://opentdb.com/api.php?${queryParams.toString()}`);
    },
    gcTime: 0,
  });
