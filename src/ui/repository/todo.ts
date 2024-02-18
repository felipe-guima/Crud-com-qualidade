interface TodoRepositoryGetParams {
  page: number;
  limit: number;
}
interface TodoRepositoryGetOutput {
  todos: Todo[];
  total: number;
  pages: number;
}

function get({
  page,
  limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
  return fetch(
    `http://localhost:3000/api/todos?page=${page}&limit=${limit}`
  ).then(async (respostaDoServidor) => {
    const todosString = await respostaDoServidor.text();
    // Cast não recomendado no Back ex. as Todo[]
    const responseParsed = parseTodosFromServer(JSON.parse(todosString));

    // a logica de paginação pode ser feita no front, mas é mais comun vir do back
    // const ALL_TODOS = todosFromServer;
    // const startIndex = (page - 1) * limite;
    // const endIndex = page * limite;
    // const paginetedTodos = ALL_TODOS.slice(startIndex, endIndex);
    // const totalPages = Math.ceil(ALL_TODOS.length / limite);

    // como garantir que um dado não é any ser fazer o cast
    return {
      total: responseParsed.total,
      todos: responseParsed.todos,
      pages: responseParsed.pages,
    };
  });
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

function parseTodosFromServer(responseBody: unknown): {
  total: number;
  pages: number;
  todos: Array<Todo>;
} {
  if (
    responseBody !== null &&
    typeof responseBody === "object" &&
    "todos" in responseBody &&
    "total" in responseBody &&
    "pages" in responseBody &&
    Array.isArray(responseBody.todos)
  ) {
    return {
      total: Number(responseBody.total),
      pages: Number(responseBody.pages),
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
    pages: 1,
    total: 0,
    todos: [],
  };
}
