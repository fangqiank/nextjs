import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDir = path.join(process.cwd(), 'blogposts')

export const getSortedPosts = () => {
	const fileNames = fs.readdirSync(postsDir)
	const allPosts = fileNames.map(fn => {
		const id = fn.replace(/\.md$/, '')

		const fullPath = path.join(postsDir, fn)
		const fileContents = fs.readFileSync(fullPath, 'utf8')

		const matterRes = matter(fileContents)

		const blogPost: BlogPost = {
			id,
			title: matterRes.data.title,
			date: matterRes.data.date 				
		}

		return blogPost
	})

	return allPosts.sort((a,b) => a.date < b.date ? 1 : -1)
} 

export const getPostsData = async (id: string) => {
	const fullPath = path.join(postsDir, `${id}.md`)
	const fileContents = fs.readFileSync(fullPath, 'utf8')

	const matterRes = matter(fileContents)

	const processedContents = await remark()
		.use(html)
		.process(matterRes.content)

	const contentHtml = processedContents.toString()

	const blogPostInHtml: BlogPost & {contentHtml: string} = {
		id,
		title: matterRes.data.title,
		date: matterRes.data.date,
		contentHtml,
	}

	return blogPostInHtml
}