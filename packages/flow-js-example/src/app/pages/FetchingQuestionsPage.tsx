import { useGameStore } from '../store';
import { useFetchQuestions } from '../queries/useFetchQuestions';
import { useEffect, useMemo, useState } from 'react';
import { QuestionApiResponse } from '../lib/types';
import { Loading } from '../components/Loading';
import { FlexBox } from '../components/FlexBox';
import { Button } from '@mui/material';

export const FetchingQuestionsPage = () => {
  const { context, triggerEvent } = useGameStore((state) => state);
  const { data, isLoading, isError, refetch } = useFetchQuestions(context);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (data && !isLoading && !isError) {
      data.json().then(({ results }: QuestionApiResponse) => {
        if (results.length === 0) {
          setIsEmpty(true);
        } else {
          triggerEvent('questionsFetched', {
            questions: results.map((question) => ({
              question: question.question,
              answer: question.correct_answer === 'True',
            })),
          });
        }
      });
    }
  }, [data, isError, isLoading, triggerEvent]);

  const content = useMemo(() => {
    if (isEmpty) {
      return (
        <FlexBox data-testid="emptyQuestionsContainer">
          <div>No questions found for this category and difficulty</div>
          <Button onClick={() => triggerEvent('playAgain')}>Start Over</Button>
        </FlexBox>
      );
    }
    if (isError) {
      return (
        <FlexBox>
          <div>Failed to fetch questions, </div>
          <Button onClick={() => refetch()}>Try again!</Button>
        </FlexBox>
      );
    }

    return <Loading />;
  }, [isEmpty, isError, refetch, triggerEvent]);

  return content;
};
