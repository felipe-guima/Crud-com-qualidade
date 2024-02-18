import { todoRepository } from "@ui/repository/todo";

interface TodoControllerGetParams {
  page: number;
}

async function get(params: TodoControllerGetParams) {
  // eslint-disable-next-line no-console
  console.log(params);
  return todoRepository.get({
    page: params.page,
    limit: 2,
  });
}

export const todoControllerFront = {
  get,
};
