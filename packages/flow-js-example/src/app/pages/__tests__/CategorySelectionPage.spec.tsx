import { useGameStore } from '../../store';
import { CategorySelectionPage } from '../CategorySelectionPage';
import { render, fireEvent } from '@testing-library/react';

describe('CategorySelectionPage', () => {
  it('should render', () => {
    const { baseElement } = render(<CategorySelectionPage />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should trigger event on change', () => {
    const triggerEvent = jest.fn();
    useGameStore.setState({ triggerEvent });
    const { getByTestId } = render(<CategorySelectionPage />);
    fireEvent.change(getByTestId('category-select'), {
      target: { value: '11' },
    });
    expect(triggerEvent).toHaveBeenCalledWith('categoryPicked', {
      category: '11',
    });
  });
});
