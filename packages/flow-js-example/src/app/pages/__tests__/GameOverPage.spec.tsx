import { render } from '@testing-library/react';
import { GameOverPage } from '../GameOverPage';

describe('GameOverPage tests', () => {
  it('should render', () => {
    const { baseElement } = render(<GameOverPage />);
    expect(baseElement).toMatchSnapshot();
  });
});
