export default async function getUserPosts(userId: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, 
    { 
        // cache: 'no-store',
        next: { revalidate: 60 } 
    })

    if (!res.ok) 
        return undefined

    return res.json()
}