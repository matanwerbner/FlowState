import { render } from '@testing-library/react';
import { GamePage } from '../GamePage';
import { useGameStore } from '../../store';

describe('GamePage tests', () => {
  it('should render', () => {
    useGameStore.setState({
      context: {
        questions: [{ question: 'test', answer: true }],
        currentQuestionIndex: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        category: 'test',
        difficulty: 'easy',
      },
    });
    const { baseElement } = render(<GamePage />);
    expect(baseElement).toMatchSnapshot();
  });
});
