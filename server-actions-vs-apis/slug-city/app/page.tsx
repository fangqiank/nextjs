import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import { revalidatePath } from 'next/cache'
import clsx from 'clsx'
import { SLUGS } from '@/data'
import { sql } from '@/sql-api'

const Home = async () => {
  const {userId} = auth()
  const bookmarkSlugs = userId 
    ? (await sql
      `
        SELECT * FROM bookmarks 
        WHERE userId = ${userId} AND active = true
      `).map(row => row.slug)
    : []

  return (
    <>
      <h1 className="text-3xl font-bold mb-3"> Server Actions - Direct To Database</h1>

      {!userId && (
        <div className="text-2xl my-3 text-center">
          Sign in to start bookmarking your favorite slugs
        </div>
      )}

      <form className='flex flex-wrap'>
        {SLUGS.map(({slug, name}) => (
          <div
            key={slug} 
            className="max-w-sm rounded overflow-hidden shadow-lg px-6 py-4"
          >
            <Image 
              className="w-full rounded-lg"
              src={`/${slug}.png`}
              alt={name}
              width={1024}
              height={1024}
            />

            <div>
              <div className="font-bold text-xl my-2">
                {name}
              </div>

              {userId && (
                <button
                  className={clsx('text-white font-bold py-2 px-4 rounded', {
                    'bg-blue-500 hover:bg-blue-700': !bookmarkSlugs.includes(slug),
                    "bg-red-500 hover:bg-red-700 ": bookmarkSlugs.includes(slug),  
                  })}
                  formAction={async () => {
                    'use server'

                    await sql`
                      INSERT INTO bookmarks (userId, slug)
                      VALUES(${userId},${slug})
                      ON CONFLICT (userId, slug)
                      DO UPDATE SET active = NOT bookmarks.active
                    `

                    revalidatePath('/')
                  }}
                >
                  {bookmarkSlugs.includes(slug) ? 'Un-Bookmark' : "Bookmark"}
                </button>
              )}
            </div>
          </div>
        ))}
      </form>
    </>
  )
}

export default Home

export const metadata: Metadata = {
  title: "Server Actions - Direct To Database",
}