import fs from "fs";
import { v4 as uuid } from "uuid";
const DB_FILE_PATH = "./core/db";

// eslint-disable-next-line no-console
console.log("-------------------[CRUD]---------------------");

type UUID = string;

//modelo
interface Todo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): Todo {
  const todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false,
  };
  // diamond operator, modo de tipar a constante Array <Todo>
  const todos: Todo[] = [...read(), todo];
  // passar o caminho e o conteudo na funçao WriteFileSync
  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos,
      },
      null,
      2
    )
  );
  return todo;
}

// Fail Fast validations
function read(): Array<Todo> {
  // garantir que caaso não venha um objeto o codigo não quebre
  // talvez tenha string ou não
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");
  if (!db.todos) {
    return [];
  }
  return db.todos;
}

function clearDB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

function update(id: UUID, partialTodo: Partial<Todo>) {
  let updateTodo;
  const todos = read();
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      updateTodo = Object.assign(currentTodo, partialTodo);
    }
  });
  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos,
      },
      null,
      2
    )
  );
  if (!updateTodo) {
    throw new Error("Por favor, insirá um ID valido !!");
  }
  return updateTodo;
}

function updateContentById(id: UUID, content: string): Todo {
  return update(id, {
    content,
  });
}

function deleteById(id: UUID) {
  const todos = read();
  const todosWithouOne = todos.filter((todo) => {
    if (todo.id === id) {
      return false;
    }
    return true;
  });

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos: todosWithouOne,
      },
      null,
      2
    )
  );
}

//Chamadas de Funções
clearDB();

create("-----PRIMEIRO TODO !!!!!------");
const secondTodo = create("Segunda TODO *****");
const terceiraTodo = create("TERCEIRA TODO *****");

deleteById(secondTodo.id);
//update(terceiraTodo.id, {content: "...............ATUALIZADA ............"})

updateContentById(terceiraTodo.id, "----- Atualizado NOVA -------");

const todos = read();

// eslint-disable-next-line no-console
console.log(todos);
// eslint-disable-next-line no-console
console.log(todos.length);
