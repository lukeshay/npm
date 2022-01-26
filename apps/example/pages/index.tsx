import type { NextPage } from 'next';
import { Container, Table, Checkbox } from '@mantine/core';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const [todos, setTodos] = useState<{ id: string; content: string; completed: boolean }[]>([]);

  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const todos = await response.json();
    setTodos(todos);
  };

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  });

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return;
    }

    await fetch(`/api/todos`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...todos.find((todo) => todo.id === id), completed: !todo.completed }),
    });

    await fetchTodos();
  };

  return (
    <Container>
      <Table m="md">
        <thead>
          <tr>
            <th>Todo</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(({ id, content, completed }) => (
            <tr key={id}>
              <td>
                <Checkbox checked={completed} label={content} onChange={() => toggleTodo(id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
