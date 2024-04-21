import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../app';

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

describe('App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render app initially', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toMatchSnapshot();
  });
});
