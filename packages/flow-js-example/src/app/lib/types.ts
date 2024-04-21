export type GameStates =
  | 'pickCategory'
  | 'pickDifficulty'
  | 'fetchQuestions'
  | 'gameInProgress'
  | 'gameOver';

export type EventNames =
  | 'categoryPicked'
  | 'difficultyPicked'
  | 'questionsFetched'
  | 'answerQuestion'
  | 'playAgain';

export type GameContext = {
  category: string;
  difficulty: string;
  questions: Array<{
    question: string;
    answer: boolean;
  }>;
  currentQuestionIndex: number;
  correctAnswers: number;
  incorrectAnswers: number;
};

export type QuestionApiResponse = {
  response_code: number;
  results: Array<{
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>;
  }>;
};
