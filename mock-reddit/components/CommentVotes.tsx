'use client'

import React from 'react'
import { Button } from './ui/Button'
import {toast} from '../hooks/use-toast'
import {useCustomToasts} from '../hooks/use-custom-toasts'
import { cn } from '@/lib/utils'
import { CommentVoteRequest } from '@/lib/validatiors/vote'
import {usePrevious} from '@mantine/hooks'
import {CommentVote, VoteType} from '@prisma/client'
import {useMutation} from '@tanstack/react-query'
import axios, {AxiosError} from 'axios'
import {ArrowBigDown, ArrowBigUp} from 'lucide-react'
import { useState } from 'react'

type PartialVote = Pick<CommentVote, 'type'>

type CommentVotesProps = {
	commentId: string,
	_votesAmount: number,
	_currentVote?: PartialVote 
}

export const CommentVotes = ({commentId, _votesAmount, _currentVote}: CommentVotesProps) => {
	const {loginToast} = useCustomToasts()
	const [votesAmount, setVotesAmount] = useState(_votesAmount)
	const [currentVote, setCurrentVote] = useState<PartialVote | undefined>(_currentVote)
  const prevVote = usePrevious(currentVote)

	const {mutate: vote} = useMutation({
		mutationFn: async (type: VoteType) => {
			const payload: CommentVoteRequest = {
				VoteType: type,
				commentId
			}

			await axios.patch('/api/subreddit/post/comment/vote', payload)
		}, 

		onError: (err, voteType) => {
			if(voteType === 'UP')
				setVotesAmount(prev => prev - 1)
			else
				setVotesAmount(prev => prev + 1)

			setCurrentVote(prevVote)

			if(err instanceof AxiosError) {
				if(err.response?.status === 401)
					return loginToast()
			}

			return toast({
				title: 'Something went wrong.',
        description: 'Your vote was not registered. Please try again.',
        variant: 'destructive'
			})
		},

		onMutate: (type: VoteType) => {
			if(currentVote?.type === type){
				setCurrentVote(undefined)
				if(type === 'UP')
					setVotesAmount(prev => prev - 1)
				else if(type === 'DOWN')
					setVotesAmount(prev => prev + 1)
				else
					setCurrentVote({type})
					if(type === 'UP')
						setVotesAmount(prev => prev + (currentVote ? 2 : 1))
					else if(type === 'DOWN')
						setVotesAmount(prev => prev - (currentVote ? 2 : 1))
			}
		}
	})

	const contents = (
		<div className="flex gap-1">
			<Button
				onClick={() => vote('UP')}
				size='xs'
				variant='ghost'
				aria-label='upvote'
			>
				<ArrowBigUp
					className={cn('h-5 w-5 text-zinc-700', {
            'text-emerald-500 fill-emerald-500': currentVote?.type === 'UP',
          })}
				/>
			</Button>

			<p className="text-center py-2 px-1 font-medium text-xs text-zinc-900">
				{votesAmount}
			</p>

			<Button
				onClick={() => vote('DOWN')}
				size='xs'
				variant='ghost'
				aria-label='upvote'
			>
				<ArrowBigDown
					className={cn('h-5 w-5 text-zinc-700', {
            'text-red-500 fill-red-500': currentVote?.type === 'DOWN',
          })}
				/>
			</Button>
		</div>
	)

	return contents
}