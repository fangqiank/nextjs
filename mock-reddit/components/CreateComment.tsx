'use client'

import { Button } from "./ui/Button"
import {toast} from '@/hooks/use-toast'
import {CommentRequest} from '@/lib/validatiors/comment'
import {useCustomToasts} from '@/hooks/use-custom-toasts'
import { useMutation } from "@tanstack/react-query"
import axios, {AxiosError} from 'axios'
import { useRouter } from "next/navigation"
import {useState} from 'react'
import { Label } from "./ui/Label"
import { Textarea } from "./ui/Textarea"

type CreateCommentProps = {
	postId: string,
	replyToId?: string
}

export const CreateComment = ({postId, replyToId}: CreateCommentProps) => {
	const [input, setInput] = useState<string>('')
	const router = useRouter()
	const {loginToast} = useCustomToasts()

	const {mutate: comment, isLoading} = useMutation({
		mutationFn: async (payload: CommentRequest) => {
			const {postId, text, replyToId} = payload
						
			const {data} = await axios.patch(`/api/subreddit/post/comment`, payload)

			return data
		},

		onError: err => {
			if(err instanceof AxiosError){
				if(err.response?.status === 401){
					return loginToast()
				}
			}

			return toast({
				title: 'Something went wrong',
				description: "Comment wasn't created successfully. Please try again.",
				variant: 'destructive'
			})
		},

		onSuccess: () => {
			router.refresh()
			setInput('')
		}
	})

	const contents = (
		<div className="grid w-full gap-1.5">
			<Label htmlFor="comment">Your comment</Label>
			<div className="mt-2">
				<Textarea
					id="comment"
					value={input}
					onChange={e => setInput(e.target.value)}
					rows={1}
					placeholder="Your comments"
				/>

				<div className="mt-2 flex justify-end">
					<Button
						isLoading={isLoading}
						disabled={input.length === 0}
						onClick={() => comment({postId, text: input, replyToId})}
					>
						Post
					</Button>
				</div>

			</div>
		</div>
	)

	return contents
}