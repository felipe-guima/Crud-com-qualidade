// o controler tem a logica interna de fazer a parte logica do codigo.
import { todoRepositoryServer } from "@server/repository/todo";
import { NextApiRequest, NextApiResponse } from "next";

function get(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const page = Number(query.page);
  const limit = Number(query.limit);

  console.log("query page ", query.page, typeof query.page);

  // validações do page e
  if (query.page && isNaN(page)) {
    res.status(400).json({
      error: {
        message: "page must be a number",
      },
    });
    return;
  }

  if (query.limit && isNaN(limit)) {
    res.status(400).json({
      error: {
        message: "limit must be a number",
      },
    });
    return;
  }

  const output = todoRepositoryServer.get({
    page,
    limit,
  });

  res.status(200).json({
    total: output.total,
    pages: output.pages,
    todos: output.todos,
  });
}

export const todoController = {
  get,
};
