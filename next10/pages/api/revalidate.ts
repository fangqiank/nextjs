// https://<your-site.com>/api/revalidate?secret=<token>
// http://localhost:3000/api/revalidate?path=/&secret=66cbf90c3e10a86ee50dba29e0020177

import {NextApiRequest, NextApiResponse} from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.query.secret !== process.env.MY_SECRET_TOKEN)
		return res.status(401).json({message: 'Invalid token'})

	const path =req.query.path as string

	await res.revalidate(path)

	return res.json({revalidated: true})
}  

export default handler