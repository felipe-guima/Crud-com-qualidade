interface TodoRepositoryGetParams {
  page: number;
  limite: number;
}
interface TodoRepositoryGetOutput {
  todos: Todo[];
  total: number;
  pages: number;
}

function get({
  page,
  limite,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
  return fetch("http://localhost:3000/api/todos").then(
    async (respostaDoServidor) => {
      const todosString = await respostaDoServidor.text();
      // Cast não recomendado no Back ex. as Todo[]
      const todosFromServer = parseTodosFromServer(
        JSON.parse(todosString)
      ).todos;

      const ALL_TODOS = todosFromServer;
      const startIndex = (page - 1) * limite;
      const endIndex = page * limite;
      const paginetedTodos = ALL_TODOS.slice(startIndex, endIndex);
      const totalPages = Math.ceil(ALL_TODOS.length / limite);

      // como garantir que um dado não é any ser fazer o cast
      return {
        todos: paginetedTodos,
        total: ALL_TODOS.length,
        pages: totalPages,
      };
    }
  );
}

export const todoRepository = {
  get,
};

// Schema Model
interface Todo {
  id: string;
  content: string;
  date: Date;
  done: boolean;
}

function parseTodosFromServer(responseBody: unknown): { todos: Array<Todo> } {
  if (
    responseBody !== null &&
    typeof responseBody === "object" &&
    "todos" in responseBody &&
    Array.isArray(responseBody.todos)
  ) {
    return {
      todos: responseBody.todos.map((todo: unknown) => {
        if (todo == null && typeof todo !== "object") {
          throw new Error("invalid todo from server");
        }

        const { id, content, date, done } = todo as {
          id: string;
          content: string;
          date: string;
          done: string;
        };

        return {
          id,
          content,
          done: String(done).toLowerCase() === "true",
          date: new Date(date),
        };
      }),
    };
  }

  return {
    todos: [],
  };
}
