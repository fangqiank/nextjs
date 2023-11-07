import { prisma } from "@/db"
import Link from "next/link"
import { Todo } from "./components/Todo"

const getTodos = () => prisma.todo.findMany()

async function toggleTodo(id: string, completed: boolean) {
  'use server'


  // console.log(id, completed);
  await prisma.todo.update({
    where: {
      id
    },
    data: {
      completed
    }
  })
}

export default async function Home() {
  // await prisma.todo.create({data: {
  //   title: 'test',
  //   completed: false
  // }})

  const todos = await getTodos()


  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link 
          href='/new'
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          New
          </Link>
      </header>
      <ul className="pl-4">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo} 
          />
        ) )}
      </ul>
    </>
  )
}
