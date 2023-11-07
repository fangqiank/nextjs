import {cookies} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'
import {bookmarkSlug, getSelectedSlugs} from '@/remote-api'

type Props = {
	req: NextRequest,
	params: {
		slug: string
	}
}
const POST = async ({req, params:{slug}}: Props) => {
	const session = cookies().get('__session')?.value!

	await bookmarkSlug(session!, slug)

	return NextResponse.json(await getSelectedSlugs(session!))
}