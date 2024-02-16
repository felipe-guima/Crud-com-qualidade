// Algoritimo de paginação mais comum
const page = 2;
const limite = 2;

const ALL_TODOS = [
  {
    id: "59097768-1f49-4ebb-ad02-93ed72cfe021",
    date: "2024-02-12T03:24:45.597Z",
    content: "-----PRIMEIRO TODO !!!!!------",
    done: false,
  },
  {
    id: "2fd2fcb7-b719-4406-9c4c-18018cc79406",
    date: "2024-02-12T03:24:45.607Z",
    content: "----- Atualizado NOVA -------",
    done: false,
  },
  {
    id: "2fd2fcb7-b719-4406-9c4c-18018cc79406",
    date: "2024-02-12T03:24:45.607Z",
    content: "----- 3 -------",
    done: false,
  },
  {
    id: "2fd2fcb7-b719-4406-9c4c-18018cc79406",
    date: "2024-02-12T03:24:45.607Z",
    content: "----- 4 -------",
    done: false,
  },
  {
    id: "2fd2fcb7-b719-4406-9c4c-18018cc79406",
    date: "2024-02-12T03:24:45.607Z",
    content: "----- 5 -------",
    done: false,
  },
];

console.log(ALL_TODOS);

const startIndex = (page - 1) * limite;
console.log(startIndex);

const endIndex = page + limite;
console.log(endIndex);

const paginetedTodo = ALL_TODOS.slice(startIndex, endIndex);
console.log(paginetedTodo);
