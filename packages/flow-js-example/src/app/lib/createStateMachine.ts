import { createFlow } from 'flow-js';
import { GameContext, GameStates } from './types';
import { TransitionFunctionParams } from 'packages/flow-js/src/lib/types';

export const InitialData: GameContext = {
  category: '',
  difficulty: '',
  questions: [],
  currentQuestionIndex: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
};

export const InitialState = 'pickCategory';

const CATEGORY_REQUIRED_ERROR = 'Category is required';
const DIFFICULTY_REQUIRED_ERROR = 'Difficulty is required';

//shared state transition
const playAgain = async ({
  setContext,
}: {
  setContext: (ctx: GameContext) => void;
}): Promise<GameStates> => {
  setContext(InitialData);
  return Promise.resolve('pickCategory');
};

export const createStateMachine = () => {
  return createFlow({
    context: InitialData,
    initialState: InitialState,
    flowStates: {
      pickCategory: {
        transitions: {
          categoryPicked: async ({
            setContext,
            data,
          }: TransitionFunctionParams<GameContext>) => {
            if (data.category === undefined) {
              return {
                errors: {
                  category: CATEGORY_REQUIRED_ERROR,
                },
              };
            }
            setContext(data);
            return 'pickDifficulty';
          },
        },
      },
      pickDifficulty: {
        transitions: {
          difficultyPicked: async ({
            setContext,
            data,
          }: TransitionFunctionParams<GameContext>) => {
            if (data.difficulty === undefined) {
              return {
                errors: {
                  difficulty:
                    data.difficulty === InitialData.difficulty
                      ? DIFFICULTY_REQUIRED_ERROR
                      : '',
                },
              };
            }
            setContext(data);
            return 'fetchQuestions';
          },
        },
      },
      fetchQuestions: {
        transitions: {
          questionsFetched: async ({
            setContext,
            data,
          }: TransitionFunctionParams<GameContext>) => {
            if (data.questions == null) {
              return {
                errors: {
                  questions: 'Questions not found',
                },
              };
            }
            setContext(data);
            return 'gameInProgress';
          },
          playAgain,
        },
      },
      gameInProgress: {
        transitions: {
          answerQuestion: async ({
            getContext,
            setContext,
            data,
          }: TransitionFunctionParams<GameContext>) => {
            const context = getContext();
            if (context.currentQuestionIndex < context.questions.length - 1) {
              setContext({
                ...data,
                currentQuestionIndex: context.currentQuestionIndex + 1,
              });
              return 'gameInProgress';
            }

            setContext(data);
            return 'gameOver';
          },
        },
      },
      gameOver: {
        transitions: {
          playAgain,
        },
      },
    },
  });
};
