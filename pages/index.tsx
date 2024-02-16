import React from "react";
import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { todoControllerFront } from "@ui/controller/todo";
const bg = "/bg2.jpeg";

// const bg = "https://mariosouto.com/cursos/crudcomqualidade/bg"

interface HomeTodo {
  id: string;
  content: string;
}

export default function Page() {
  const [page, setPage] = React.useState(1);
  // variaveis que mudam em react | poderia definir tb como <Array<HomeTodo>>
  const [todos, setTodos] = React.useState<HomeTodo[]>([]);

  // o useEffect Load infos onload !!! - apenas uma vez !!.
  React.useEffect(() => {
    todoControllerFront.get({ page }).then(({ todos }) => {
      setTodos(todos);
    });
  }, []);

  return (
    <main>
      <GlobalStyles themeName="indigo" />
      <header
        style={{
          backgroundImage: `url('${bg}')`,
        }}
      >
        <div className="typewriter">
          <h1>O que fazer hoje?</h1>
        </div>
        <form>
          <input type="text" placeholder="Correr, Estudar..." />
          <button type="submit" aria-label="Adicionar novo item">
            +
          </button>
        </form>
      </header>

      <section>
        <form>
          <input type="text" placeholder="Filtrar lista atual, ex: Dentista" />
        </form>

        <table border={1}>
          <thead>
            <tr>
              <th align="left">
                <input type="checkbox" disabled />
              </th>
              <th align="left">Id</th>
              <th align="left">Conteúdo</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {todos.map((currentTodos) => {
              return (
                <tr key={currentTodos.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{currentTodos.id.substring(0, 4)}</td>
                  <td>{currentTodos.content}</td>
                  <td align="right">
                    <button data-type="delete">Apagar</button>
                  </td>
                </tr>
              );
            })}

            {/* <tr>
              <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                Carregando...
              </td>
            </tr> */}

            {/* <tr>
              <td colSpan={4} align="center">
                Nenhum item encontrado
              </td>
            </tr> */}

            <tr>
              <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                <button data-type="load-more" onClick={() => setPage(page + 1)}>
                  Pagina {page}, Carregar mais{" "}
                  <span
                    style={{
                      display: "inline-block",
                      marginLeft: "4px",
                      fontSize: "1.2em",
                    }}
                  >
                    ↓
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
