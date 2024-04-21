import { rest } from 'msw';
import { QuestionApiResponse } from '../lib/types';

const mockedSuccessResponse: QuestionApiResponse = {
  response_code: 1,
  results: [
    {
      category: 'Entertainment: Video Games',
      type: 'boolean',
      difficulty: 'medium',
      question:
        "The retail disc of Tony Hawk's Pro Skater 5 only came out in North America.",
      correct_answer: 'True',
      incorrect_answers: ['False'],
    },
  ],
};

export const httpHandlers = [
  rest.get('https://opentdb.com/api.php', (req, res, ctx) => {
    return res(ctx.status(200, 'success'), ctx.json(mockedSuccessResponse));
  }),
];
