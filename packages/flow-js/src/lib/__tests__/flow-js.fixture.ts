import { createFlow } from '../flow-js';
import { TransitionFunctionParams } from '../types';

type FlowContext = {
  isValid: boolean;
};

export const getTestFlow = () =>
  createFlow({
    context: {
      isValid: true,
    } as FlowContext,
    initialState: 'state1',
    flowStates: {
      state1: {
        transitions: {
          event1: async ({
            setContext,
            data,
          }: TransitionFunctionParams<FlowContext>) => {
            if (data == null) {
              return {
                errors: {
                  data: 'data is undefined',
                },
              };
            }
            if (!data['isValid']) {
              return {
                errors: {
                  isValid: 'context.isValid is not true',
                },
              };
            }
            setContext(data);
            return 'state2';
          },
        },
      },
      state2: {
        transitions: {
          event2: async () => 'state1',
        },
      },
    },
  });
