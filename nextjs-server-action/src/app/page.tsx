import { PostCard } from "@/components/PostCard"
import Link from 'next/link'
import fs from 'node:fs/promises'
import { NameField } from "@/components/FileList"
import { AddTodo } from "@/components/AddTodo"
import { TodoList } from "@/components/TodoList"

const getPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_sort=title', {
    next:{
      tags: ['posts'],
      revalidate: 3600
    }
  })
  return res.json()
}

export default async function Home() {
  /*const posts = await getPosts()
  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link
            className="btn btn-outline"
            href='new'
          >
            New
          </Link>
        </div>
      </h1>

      <div className="card-grid">
        {posts.map(post => (
          <PostCard
            key={post.id}
            {...post} 
          />
        ))}
      </div>
    </>
  )*/
  /*
  const getFiles =async (path: string) => {
    'use server'
    return fs.readdir(path)
  }

  return(
    <main className="p-5 text-2xl max-w-xs">
      <NameField getFiles={getFiles} />
    </main>
  )
  */

  return (
    <>
      <div>
        <Link href="/formPost">Simple Form Post</Link>
      </div>
      <div>
        <Link href="/formPostWithStatus">Form Post With Status</Link>
      </div>
      <div>
        <Link href="/formPostWithTransition">Form Post With Transition</Link>
      </div>
      <div>
        <Link href="/search">Pokemon Search</Link>
      </div>

      <AddTodo />
      
      {/* @ts-expect-error Server Component */}
      <TodoList />
    </>
  )

}
