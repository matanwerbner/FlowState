import { Button } from '@mui/material';
import { FlexBox } from '../components/FlexBox';
import { useGameStore } from '../store';

// shows "game over" message, and number of correct and incorrect responses.
export const GameOverPage = () => {
  const { context, triggerEvent } = useGameStore();
  return (
    <FlexBox>
      <h3>Game over!</h3>
      <div>Correct answers: {context.correctAnswers}</div>
      <div>Incorrect answers: {context.incorrectAnswers}</div>
      <Button
        onClick={() => {
          triggerEvent('playAgain');
        }}
      >
        Play again
      </Button>
    </FlexBox>
  );
};
