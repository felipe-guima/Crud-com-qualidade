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
      const todosFromServer = JSON.parse(todosString).todos;
      console.log(page);
      console.log(limite);

      const ALL_TODOS = todosFromServer;
      const startIndex = (page - 1) * limite;
      const endIndex = page * limite;
      const paginetedTodos = ALL_TODOS.slice(startIndex, endIndex);
      const totalPages = Math.ceil(ALL_TODOS.length / limite);

      // como garantir que um dado não é any ser fazer o cast 
      return {
        todos: ALL_TODOS,
        total: ALL_TODOS.length,
        pages: 1,
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
