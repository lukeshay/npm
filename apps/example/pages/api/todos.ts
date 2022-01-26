import * as yup from 'yup';
import * as uuid from 'uuid';

import router, { Handler } from '../../server/router';
import { validate } from '../../server/services/schema-server';

const postBodySchema = yup.object().shape({
  content: yup.string().required(),
  completed: yup.boolean().default(false).optional(),
});

const putBodySchema = postBodySchema.shape({
  id: yup.string().required(),
});

type Todo = {
  id: string;
  completed: boolean;
  content: string;
};

const TODOS: Todo[] = [
  {
    id: uuid.v4(),
    completed: false,
    content: 'Learn Next.js',
  },
  {
    id: uuid.v4(),
    completed: true,
    content: 'Deploy apps',
  },
  {
    id: uuid.v4(),
    completed: false,
    content: 'Learn GraphQL',
  },
];

const post: Handler = async (req, res) => {
  const todo = await validate(postBodySchema, req.body);

  TODOS.push({
    id: uuid.v4(),
    ...todo,
  });

  res.status(200).json(todo);
};

const get: Handler = async (_, res) => {
  res.status(200).json(TODOS);
};

const put: Handler = async (req, res) => {
  const todo = await validate(putBodySchema, req.body);

  const currentTodo = TODOS.find((t) => t.id === todo.id);

  if (!currentTodo) {
    res.status(404).json({
      error: 'Todo not found',
    });

    return;
  }

  TODOS.splice(TODOS.indexOf(currentTodo), 1, {
    ...currentTodo,
    ...todo,
  });

  res.status(200).json(todo);
};

export default router().post(post).get(get).put(put).handler();
