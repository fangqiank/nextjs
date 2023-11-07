'use client'

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

type ProvidersProps = {
	children: ReactNode
}

export const Providers = ({children}: ProvidersProps) => {
	const client = new QueryClient()

	return (
		<QueryClientProvider client={client}>
			<SessionProvider>
				{children}
			</SessionProvider>
		</QueryClientProvider>
	)
}