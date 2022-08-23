import type { NextPage } from "next";
import { Container, Table, Checkbox } from "@mantine/core";
import { useEffect, useState } from "react";

type Todo = {
  id: string;
  completed: boolean;
  content: string;
};

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async (): Promise<void> => {
    const response = await fetch("/api/todos");
    const fetchedTodos = (await response.json()) as Todo[];

    setTodos(fetchedTodos);
  };

  useEffect(() => {
    void fetchTodos();
  });

  const toggleTodo = async (id: string): Promise<void> => {
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return;
    }

    await fetch(`/api/todos`, {
      body: JSON.stringify({
        ...todo,
        completed: !todo.completed,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    await fetchTodos();
  };

  return (
    <Container>
      <Table m="md">
        <thead>
          <tr>
            <th>{"Todo"}</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(({ id, content, completed }) => (
            <tr key={id}>
              <td>
                <Checkbox
                  checked={completed}
                  label={content}
                  onChange={async (): Promise<void> => toggleTodo(id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
