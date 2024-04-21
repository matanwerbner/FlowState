export type FlowContext = Record<string, unknown>;

export type Flow<TContextType, TPossibleStates> = {
  context: TContextType;
  currentState: keyof TPossibleStates;
};

export type FlowConfig<
  TContext extends FlowContext,
  TPossibleStates extends FlowStates<TPossibleStates, TContext>
> = {
  context: TContext;
  flowStates: TPossibleStates;
  initialState: keyof TPossibleStates;
};

export type FlowStates<TAllStates, TContext> = Record<
  keyof TAllStates,
  {
    transitions: Record<string, Transition<TContext, keyof TAllStates>>;
  }
>;

export type Transition<TContext, TKeys> = ({
  getContext,
  setContext,
  data,
}: TransitionFunctionParams<TContext>) => Promise<
  TransitionErrors<TContext> | TKeys
>;

export type TransitionFunctionParams<TContext> = {
  getContext: () => TContext;
  setContext: (newContext: Partial<TContext>) => void;
  data: TransitionData;
};

export type TransitionErrors<TContext> = {
  errors: Partial<Record<keyof TContext, string[] | string>>;
};

export type StateMachine<
  TContext extends FlowContext,
  TPossibleStates extends FlowStates<TPossibleStates, TContext>
> = {
  context: TContext;
  currentState: keyof TPossibleStates;
  triggerEvent: <
    T extends KeysOfUnion<TPossibleStates[keyof TPossibleStates]['transitions']>
  >(
    eventName: T,
    data?: TransitionData
  ) => Promise<keyof TPossibleStates>;
};

export type TransitionData = Record<string, unknown>;

export type KeysOfUnion<T> = T extends T ? keyof T : never;
