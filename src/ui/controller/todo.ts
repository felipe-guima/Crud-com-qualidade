async function get() {
  return fetch("http://localhost:3000/api/todos").then(
    async (respostaDoServidor) => {
      const todosString = await respostaDoServidor.text();
      const todosFromServer = JSON.parse(todosString).todos;
      return todosFromServer;
    }
  );
}

export const todoControllerFront = {
  get,
};
