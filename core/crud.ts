import fs from 'fs';
const DB_FILE_PATH = "./core/db";

// No entanto tudo isso é criado apenas em memoria sem percistencia

console.log("----------------[CRUD]-------------------")

function create(content: string) {

  // passar o caminho e o conteudo na funçao WriteFileSync
  fs.writeFileSync(DB_FILE_PATH, content)

  return content;
}

function read() {
  const db = fs.readFileSync(DB_FILE_PATH, "utf-8")

  return db;
}

//create("Primeira TODO do projeto !")


create(" Nova TODO para ler o arquivo !")

console.log(read())
