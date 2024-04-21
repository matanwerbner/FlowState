import { getTestFlow } from './flow-js.fixture';

describe('flowJs', () => {
  let fixtureFlow: ReturnType<typeof getTestFlow>;

  beforeEach(() => {
    fixtureFlow = getTestFlow();
  });

  it('should create a flow', () => {
    expect(fixtureFlow).toBeDefined();
  });

  it('should return initial state', () => {
    expect(fixtureFlow.currentState).toBe('state1');
  });

  it('should not trigger event if validation fails', async () => {
    await expect(fixtureFlow.triggerEvent('event1')).rejects.toMatchSnapshot();
  });

  it('should return validation errors based on data', async () => {
    await expect(
      fixtureFlow.triggerEvent('event1', { isValid: false })
    ).rejects.toMatchSnapshot();
  });

  it("should fail triggering event not found in current state's transitions", async () => {
    await expect(fixtureFlow.triggerEvent('event2')).rejects.toMatchSnapshot();
  });
});
