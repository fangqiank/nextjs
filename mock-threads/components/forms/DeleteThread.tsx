'use client'

import Image from "next/image"
import {usePathname, useRouter} from 'next/navigation'
import {deleteThread} from '@/lib/actions/thread.actions'

type DeleteThreadProps = {
	threadId: string,
	currentUserId: string,
	authorId: string,
	parentId: string | null,
	isComment?:boolean
}

export const DeleteThread = ({
	threadId,
	currentUserId,
	authorId, 
	parentId,
	isComment
}: DeleteThreadProps) => {
	const pathname = usePathname()
	const router = useRouter()
	
	if(currentUserId !== authorId || pathname === '/')
		return 

	return (
		<Image
			src='/assets/delete.svg'
			alt='delete'
			width={18}
			height={18} 
			className="cursor-pointer object-contain"
			onClick={async () => {
				window.confirm("Are you sure to delete this thread?") 
				? await deleteThread(JSON.parse(threadId), pathname)
				: null

				if(!parentId || !isComment)
					router.push('/')
			}}
		/>
	)
}