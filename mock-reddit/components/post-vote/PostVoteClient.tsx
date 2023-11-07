'use client'

import {useCustomToasts} from '@/hooks/use-custom-toasts'
import {PostVoteRequest} from '@/lib/validatiors/vote'
import {usePrevious} from '@mantine/hooks'
import {VoteType} from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import {toast} from '@/hooks/use-toast'
import { Button } from '../ui/Button'
import {ArrowBigDown, ArrowBigUp} from 'lucide-react'
import {cn} from '@/lib/utils'

type PostVoteClientProps = {
	postId: string,
	initVotesAmt: number,
	initVote?:VoteType | null
}

export const PostVoteClient = ({postId, initVotesAmt, initVote}: PostVoteClientProps) => {
	const {loginToast} = useCustomToasts()
	const [votesAmt, setVotesAmt] = useState<number>(initVotesAmt)
	const [currentVote, setCurrentVote] = useState(initVote)
	const prevVote = usePrevious(currentVote)

	useEffect(() => setCurrentVote(initVote), [initVote])

	const {mutate: vote} = useMutation({
		mutationFn:async (type: VoteType) => {
			const payload: PostVoteRequest = {
				voteType: type,
				postId
			}

			await axios.patch(`/api/subreddit/post/vote`, payload)
		},

		onError: (err, voteType) => {
			if(voteType === 'UP')
				setVotesAmt(prev => prev - 1)
			else if(voteType === 'DOWN')
				setVotesAmt(prev => prev + 1)

			setCurrentVote(prevVote)

			if(err instanceof AxiosError){
				if(err.response?.status === 401)
					return loginToast()
			}

			return toast({
				title: 'Something went wrong.',
        description: 'Your vote was not registered. Please try again.',
        variant: 'destructive',
			})
		},

		onMutate: (type: VoteType) => {
			if(currentVote === type){
				setCurrentVote(undefined)
				if(type === 'UP')
					setVotesAmt(prev => prev - 1)
				else if(type === 'DOWN')
					setVotesAmt(prev => prev + 1)
				else {
					setCurrentVote(type)
					if(type === 'UP')
						setVotesAmt(prev => prev + (currentVote ? 2 : 1))
					else if(type === 'DOWN')
						setVotesAmt(prev => prev - (currentVote ? 2 : 1))
				}
			}
		}
	})

	const contents = (
		<div className="flex flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
			<Button
				onClick={() => vote("UP")}
				size='sm'
				variant='ghost'
				aria-label='upvote'
			>
				<ArrowBigUp
					className={cn('h-5 w-5 text-zinc-700', {
            'text-emerald-500 fill-emerald-500': currentVote === 'UP',
          })} 
				/>
			</Button>

			<p className="text-center py-2 font-medium text-sm text-zinc-900">{votesAmt}</p>

			<Button
				onClick={() => vote("DOWN")}
				size='sm'
				variant='ghost'
				aria-label='downvote'
			>
				<ArrowBigDown
					className={cn('h-5 w-5 text-zinc-700', {
            'text-red-500 fill-red-500': currentVote === 'DOWN',
          })} 
				/>
			</Button>
		</div>
	)

	return contents
}