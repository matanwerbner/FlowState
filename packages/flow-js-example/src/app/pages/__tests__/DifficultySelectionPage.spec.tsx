import { useGameStore } from '../../store';
import { render, fireEvent } from '@testing-library/react';
import { DifficultySelectionPage } from '../DifficultySelectionPage.tsx';

describe('DifficultySelectionPage tests', () => {
  it('should render', () => {
    const { baseElement } = render(<DifficultySelectionPage />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should trigger event on change', () => {
    const triggerEvent = jest.fn();
    useGameStore.setState({ triggerEvent });
    const { getByTestId } = render(<DifficultySelectionPage />);
    fireEvent.change(getByTestId('difficulty-select'), {
      target: { value: 'easy' },
    });
    expect(triggerEvent).toHaveBeenCalledWith('difficultyPicked', {
      difficulty: 'easy',
    });
  });
});
