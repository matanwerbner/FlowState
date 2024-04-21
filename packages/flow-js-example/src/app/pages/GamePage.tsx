import styled from 'styled-components';
import { FlexBox } from '../components/FlexBox';
import { useGameStore } from '../store';
import { sanitize } from 'dompurify';
import { useState } from 'react';
import { Button } from '../components/Button';
import { AnswesContainer } from './GampePage.styled';

const AnimtionDurationMS = 500;

export const GamePage = () => {
  const context = useGameStore((state) => state.context);
  const question = context.questions[context.currentQuestionIndex];
  const triggerEvent = useGameStore((state) => state.triggerEvent);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (answer: boolean) => {
    setIsTransitioning(true);
    setTimeout(() => {
      triggerEvent('answerQuestion', {
        ...(question.answer === answer
          ? { correctAnswers: context.correctAnswers + 1 }
          : { incorrectAnswers: context.incorrectAnswers + 1 }),
      });
      if (context.currentQuestionIndex + 1 < context.questions.length) {
        setIsTransitioning(false);
      }
    }, AnimtionDurationMS);
  };

  return (
    <FlexBox style={{ opacity: isTransitioning ? 0 : 1 }}>
      <h3 dangerouslySetInnerHTML={{ __html: sanitize(question.question) }} />
      <AnswesContainer>
        <Button color="primary" onClick={() => handleAnswer(true)}>
          True
        </Button>
        <Button color="secondary" onClick={() => handleAnswer(false)}>
          False
        </Button>
      </AnswesContainer>
    </FlexBox>
  );
};
