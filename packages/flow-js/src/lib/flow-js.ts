import { FlowStateMachine } from './flowStateMachine';
import type { FlowConfig, FlowContext, FlowStates } from './types';

export const createFlow = <
  TPossibleStates extends FlowStates<TPossibleStates, TContext>,
  TContext extends FlowContext
>(
  params: FlowConfig<TContext, TPossibleStates>
) => {
  return new FlowStateMachine<TContext, TPossibleStates>(params);
};
