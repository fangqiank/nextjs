import Link from "next/link"

const fetchRepoContents = async (name) => {
	await new Promise(resolve => setTimeout(resolve, 3000))

	const res = await fetch( `https://api.github.com/repos/bradtraversy/${name}/contents`, {
		next:{
			revalidate: 60
		}
	})

	const data = await res.json()
	return data
}

export const RepoDirs = async ({name}) => {
	const results = await fetchRepoContents(name)
	const dirs = results.filter(c => c.type === 'dir')
	console.log(dirs);

	const contents = (
		<>
			<h3>Directories</h3>
			<ul>
				{dirs.map(dir => (
					<li key={dir.path}>
						<Link href={`/code/repos/${name}/${dir.path}`}>{dir.path}</Link>
					</li>
				))}
			</ul>
		</>
	)

	return contents
}
