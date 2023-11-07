import { currentUser } from "@clerk/nextjs"
import {redirect} from 'next/navigation'
import { ThreadCard } from "../../components/cards/ThreadCard"
import { Pagination } from "../../components/shared/Pagination"
import { fetchPosts } from "@/lib/actions/thread.actions"
import { fetchUser } from "@/lib/actions/user.actions"

type HomeProps = {
  params: {
    searchParam: { 
      [key: string]: string | undefined 
    }
  }
}

export default async function Home({params: {searchParam}}: HomeProps) {
  const user = await currentUser()

  if(!user)
    return null

  const userInfo = await fetchUser(user.id)

  if(!userInfo?.onboarded)
    redirect('/onboarding')
  
  const result = await fetchPosts(searchParam?.page ? +searchParam.page : 1, 30)  
    
  const contents = (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className='mt-9 flex flex-col gap-10'>
        {result.posts.length === 0 ? (
          <p className="no-result">No threads</p>
        ) : (
          <>
            {result.posts.map(post => (
              <ThreadCard
                key={post.id}
                id={post.id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children} 
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path="/"
        pageNumber={searchParam?.page ? +searchParam.page : 1}
        isNext={result.isNext} 
      />
    </>
  )

  return contents
}
