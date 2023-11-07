import { getServerSession } from "next-auth"
import { WhoAmIButton } from "@/components/WhoAmIButton"

const ServerActionPage = () => {
	const whoAmI = async () => {
		'use server'

		const session = await getServerSession()
		console.log(session);

		return session?.user?.name || 'Not logged in'
	}

	return (
		<div>
			<WhoAmIButton whoAmIAction={whoAmI}/>
		</div>
	)
}

export default ServerActionPage

