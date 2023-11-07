import Link from "next/link"

const NotFound = () => {
	return (
			<div className='text-center'>
				<p className="mt-10">The requested post does not exist.</p>
				<Link href='/'>Back to home</Link>
			</div>
	)
}

export default NotFound