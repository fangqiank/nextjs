import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import { UserCard } from "@/components/UserCard"

export default async function Home() {
  const session = await getServerSession(options)

  return (
    <>
      {session ? (
        <UserCard
          user = {session?.user}
          pagetype='home' 
        />
      ) : (
        <h1 className="text-5xl">Unauthorized</h1>
      )}
    </>
  )
}
