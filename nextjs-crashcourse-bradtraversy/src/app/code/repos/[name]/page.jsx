import { Suspense } from "react"
import Link from "next/link"
import { Repo } from "@/app/components/Repo"
import { RepoDirs } from "@/app/components/RepoDirs"

const RepoPage = ({params: {name}}) => {
	const content = (
		<div className="card">
			<Link href={`/code/repos`} className='btn btn-back'>Back</Link>

			<Suspense fallback={<div>Loading repo...</div>}>
				<Repo name={name} />
			</Suspense>

			<Suspense fallback={<div>Loading directories...</div>}>
				<RepoDirs name={name} />
			</Suspense>
		</div>
	)

	return content
}

export default RepoPage