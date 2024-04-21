import {
  FlowConfig,
  FlowContext,
  FlowStates,
  KeysOfUnion,
  StateMachine,
  TransitionData,
  TransitionErrors,
} from './types';

export class FlowStateMachine<
  TContext extends FlowContext,
  TPossibleStates extends FlowStates<TPossibleStates, TContext>
> implements StateMachine<TContext, TPossibleStates>
{
  private _context: TContext;
  private _states: TPossibleStates;
  private _currentState: keyof TPossibleStates;

  constructor({
    context,
    flowStates,
    initialState,
  }: FlowConfig<TContext, TPossibleStates>) {
    this._context = context;
    this._states = flowStates;
    this._currentState = initialState;
  }

  // returns the current context of the state machine, cloned to prevent mutation
  get context() {
    return structuredClone(this._context);
  }

  // returns the current state, used for testing
  get currentState() {
    return this._currentState;
  }

  // type guard to check if transition result has errors
  private transitionResultHasErrors(
    transitionResult: unknown
  ): transitionResult is TransitionErrors<TContext> {
    if ((transitionResult as TransitionErrors<TContext>)['errors'] != null) {
      return true;
    }
    return false;
  }

  // triggers an event from possible states, validates,  and performs transition
  async triggerEvent<
    T extends KeysOfUnion<TPossibleStates[keyof TPossibleStates]['transitions']>
  >(eventName: T, data?: TransitionData) {
    const currentState = this._states[this._currentState];

    // If event is not found in current state's transitions, reject
    if (currentState.transitions[eventName] == null) {
      return Promise.reject(
        new Error(
          `Event ${eventName} not found in state ${
            this._currentState as string
          } transitions`
        )
      );
    }

    const transitionResult = await currentState.transitions[eventName]({
      getContext: () => this.context,
      setContext: (newContext: Partial<TContext>) => {
        this._context = { ...this._context, ...newContext };
      },
      data: data || {},
    });

    // if transition result has errors, reject
    if (this.transitionResultHasErrors(transitionResult)) {
      return Promise.reject(transitionResult);
    }

    this._currentState = transitionResult as keyof TPossibleStates;

    return transitionResult;
  }

  // initializes the state machine with a state and context, used for testing
  initialize(state: keyof TPossibleStates, context: TContext) {
    this._currentState = state;
    this._context = context;
  }
}
