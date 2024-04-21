import { useEffect, useMemo, useState } from 'react';
import { CategorySelectionPage } from './pages/CategorySelectionPage';
import { DifficultySelectionPage } from './pages/DifficultySelectionPage.tsx';
import { FetchingQuestionsPage } from './pages/FetchingQuestionsPage';
import { useGameStore } from './store';
import { Slide } from '@mui/material';
import { GameStates } from './lib/types';
import { GamePage } from './pages/GamePage';
import { GameOverPage } from './pages/GameOverPage';

const AnimationDurationMS = 500;

export const Router = () => {
  const { currentState: stateFromStore } = useGameStore((state) => state);
  const [currentState, setCurrentState] = useState<GameStates>(stateFromStore);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (currentState !== stateFromStore) {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentState(stateFromStore);
      }, AnimationDurationMS);
    }
  }, [currentState, stateFromStore]);

  const content = useMemo(() => {
    switch (currentState) {
      case 'pickCategory':
        return <CategorySelectionPage />;
      case 'pickDifficulty':
        return <DifficultySelectionPage />;
      case 'fetchQuestions':
        return <FetchingQuestionsPage />;
      case 'gameInProgress':
        return <GamePage />;
      case 'gameOver':
        return <GameOverPage />;
    }
  }, [currentState]);

  // Slide in the new content from the right, div is required for slide
  return (
    <Slide
      direction={isTransitioning ? 'right' : 'left'}
      timeout={AnimationDurationMS - 100}
      in={!isTransitioning}
    >
      <div>{content}</div>
    </Slide>
  );
};
