import { create } from 'zustand';
import {
  InitialData,
  InitialState,
  createStateMachine,
} from './lib/createStateMachine';
import { EventNames, GameContext, GameStates } from './lib/types';

type InitializeParams<GameContext> = {
  state?: GameStates;
  data?: Partial<GameContext>;
};

type Storetype = {
  currentState: GameStates;
  triggerEvent: (eventName: EventNames, data?: Partial<GameContext>) => void;
  context: GameContext;
  initializeStore: ({ state, data }: InitializeParams<GameContext>) => void;
};

export const useGameStore = create<Storetype>((set) => {
  const stateMachine = createStateMachine();

  return {
    context: stateMachine.context,
    currentState: stateMachine.currentState,
    triggerEvent: (eventName: EventNames, data?: Partial<GameContext>) => {
      return stateMachine.triggerEvent(eventName, data).then((newState) => {
        set({ currentState: newState, context: stateMachine.context });
      });
    },
    initializeStore: ({ state = InitialState, data = InitialData }) => {
      stateMachine.initialize(state, { ...InitialData, ...data });
      set({
        currentState: stateMachine.currentState,
        context: stateMachine.context,
      });
    },
  };
});
