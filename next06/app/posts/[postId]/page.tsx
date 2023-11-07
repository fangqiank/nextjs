import Link from "next/link"
import { getFormattedDate } from "@/lib/getFormattedDate"
import { getSortedPosts, getPostsData } from "@/lib/posts"
import {notFound} from 'next/navigation'

export const generateStaticParams = () => {
	const posts = getSortedPosts()

	return posts.map(post => ({
		postId: post.id
	}))
}

export const generateMetadata = ({params}: {params: {postId: string}}) => {
	const posts = getSortedPosts()
	const {postId} = params

	console.log(postId);

	const post = posts.find(p => p.id === postId)

	if(!post)
		return {
			title: 'Post not found'
		}

	return {
		title: post.title
	}
}

const Post = async ({params}: {params: {postId: string}}) => {
	const posts = getSortedPosts()
	const {postId} = params

	if(!posts.find(p => p.id === postId))
		return notFound()

	const {title, date, contentHtml} = await getPostsData(postId)

	const pubDate = getFormattedDate(date)

	return (
		<main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
			<h1 className="text-3xl mt-4 mb-0">{title}</h1>
			<p className="mt-0">{pubDate}</p>

			<article>
				<section dangerouslySetInnerHTML={{__html: contentHtml}} />
				<p>
					<Link href='/'>Back to home</Link>
				</p>
			</article>
		</main>
	)
}

export default Post