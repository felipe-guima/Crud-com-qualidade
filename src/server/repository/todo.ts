import { read } from "@db-crud-todo";

interface todoRepositoryGetParams {
  page?: number;
  limit?: number;
}
interface TodoRepositoryGetOutput {
  todos: Todo[];
  total: number;
  pages: number;
}

function get({
  page,
  limit,
}: todoRepositoryGetParams = {}): TodoRepositoryGetOutput {
  const currentPage = page || 1;
  const currentLimit = limit || 10;

  const ALL_TODOS = read();

  const startIndex = (currentPage - 1) * currentLimit;
  const endIndex = currentPage * currentLimit;
  const paginetedTodos = ALL_TODOS.slice(startIndex, endIndex);
  const totalPages = Math.ceil(ALL_TODOS.length / currentLimit);

  console.log(currentPage, currentLimit);
  return {
    todos: paginetedTodos,
    total: ALL_TODOS.length,
    pages: totalPages,
  };
}

export const todoRepositoryServer = {
  get,
};

//model Schema
interface Todo {
  id: string;
  content: string;
  date: string;
  done: boolean;
}
