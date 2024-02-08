import fs from 'fs';
const DB_FILE_PATH = "./core/db";

console.log("----------------[CRUD]-------------------")

interface Todo {
  date: string;
  content: string;
  done: boolean;
}

function create(content: string) {
  const todo = {
    date: new Date().toISOString(),
    content: content,
    done: false,
  }

  // diamond operator, modo de tipar a constante Array <Todo>
  const todos: Todo[] = [
    ...read(),
    todo,
  ]
  
  // passar o caminho e o conteudo na funçao WriteFileSync
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
    todos,
  }, null, 2))
  return content;
}

// Fail Fast validations
function read():Array<Todo> {
  // garantir que caaso não venha um objeto o codigo não quebre
  // talvez tenha string ou não
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}")
  
  if (!db.todos) {
    return []
  }

  return db.todos;
}

function clearDB() {
  fs.writeFileSync(DB_FILE_PATH, '')
}

//Chamadas de Funçes

clearDB();

create("-----PRIMEIRO TODO !!!!!------");
create("Segunda TODO *****");

console.log(read());


