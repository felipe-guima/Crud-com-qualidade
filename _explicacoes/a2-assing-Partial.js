
const todo ={
  id: 1,
  content: 'Aprendendo Crud',
  done: false,
  date: new Date().toISOString(),
}

const PartialTodo = {
  conten: "*******NOVO CONTEUDO******** ",
}

//Object.assign() insere o dados do segundo no primeiro, caso seja possivel
// caso não encontre valor de dado correnpondente adiciona no final.
// pega o primeiro e sobrescreve o segundo dado
const updateTodo = Object.assign(todo, PartialTodo)

console.log(todo)

console.log(PartialTodo)

console.log(updateTodo)