'use client'

import { useState } from "react"

type Props = {
	whoAmIAction: () => Promise<string>
}

export const WhoAmIButton = ({whoAmIAction}: Props) => {
	const [name, setName] = useState<string>()
	// console.log(name);

	return (
		<div>
			<button onClick={async () => setName(await whoAmIAction())}>
				Who Am I?
			</button>
			{name && <div>You are {name}</div>}
		</div>
	)
};


