import { revalidatePath } from "next/cache";

import { AddButton } from "./AddButton" 

const todos: string[] = [];

const Home = () => {
  const addTodo = async (newTodo: string) => {
    "use server";

    await new Promise((resolve) => setTimeout(resolve, 3000));

    todos.push(newTodo)
		
    revalidatePath("/formPostWithTransition")
  }

  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold">Todos</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      <AddButton addTodo={addTodo}  />
    </main>
  )
}

export default Home