'use client'

import {
	ChangeEvent,
  ReactNode,
  createContext,
  useRef,
  useState,
} from 'react'
import { useToast } from '../ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import {trpc} from '@/app/_trpc/client'
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query'

type StreamResponse = {
	addMessage: () => void,
	message: string,
	handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
	isLoading: boolean
}

type ChatContextProviderProps = {
	fileId: string,
	children: ReactNode
}

export const ChatContext = createContext<StreamResponse>({
	addMessage: () => {},
	message: '',
	handleInputChange: () => {},
	isLoading: false
})

export const ChatContextProvider = ({fileId, children}: ChatContextProviderProps) => {
	const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

	const utils = trpc.useContext()

	const {toast} = useToast()

	const backupMsg = useRef('')

	const {mutate: sendMessage} = useMutation({
		mutationFn: async ({message}: {message: string}) => {
			const response = await fetch('/api/message', {
				method: 'POST',
				body: JSON.stringify({
					fileId,
					message
				})
			})

			if(!response.ok)
				throw new Error('Failed to send message')

			return response.body
		},

		onMutate: async ({message}) => {
			backupMsg.current = message
			setMessage('')

			await utils.getFileMessages.cancel()

			const previousMessages = utils.getFileMessages.getInfiniteData()

			utils.getFileMessages.setInfiniteData(
				{
					fileId,
					limit: INFINITE_QUERY_LIMIT
				},

				prev => {
					if(!prev){
						return {
							pages: [],
							pageParams: []
						}
					}

					let newPages = [...prev.pages]

					let latestPage = newPages[0]!

					latestPage.messages = [
						{
							createdAt: new Date().toISOString(),
							id: crypto.randomUUID(),
							text: message,
							isUserMessage: true
						},
						...latestPage.messages
					]

					newPages[0] = latestPage

					return {
						...prev,
						pages: newPages
					}
				}
			)
			
			setIsLoading(true)

			return {
				previousMessages: previousMessages?.pages.flatMap(p => p.messages) ?? []
			}
		},

		onSuccess:async (stream) => {
			setIsLoading(false)

			if(!stream){
				return toast({
          title: 'There was a problem sending this message',
          description: 'Please refresh this page and try again',
          variant: 'destructive',
        })
			}

			const reader = stream.getReader()
			const decoder = new TextDecoder()
			let endStream = false

			let accResponse = ''

			while(!endStream){
				const {value, done} = await reader.read()
				endStream = done

				const chunkData = decoder.decode(value)
				accResponse += chunkData

				utils.getFileMessages.setInfiniteData(
					{
						fileId,
						limit: INFINITE_QUERY_LIMIT
					},

					old => {
						if(!old)
							return { 
								pages: [], 
								pageParams: []
							}
						
						let isAiResponseCreated = old.pages.some(p => p.messages.some(msg => msg.id === 'ai-response'))

						let updatedPages = old.pages.map((page) => {
              if (page === old.pages[0]) {
                let updatedMessages

                if (!isAiResponseCreated) {
                  updatedMessages = [
                    {
                      createdAt: new Date().toISOString(),
                      id: 'ai-response',
                      text: accResponse,
                      isUserMessage: false,
                    },
                    ...page.messages,
                  ]
                } else {
                  updatedMessages = page.messages.map(
                    (message) => {
                      if (message.id === 'ai-response') {
                        return {
                          ...message,
                          text: accResponse,
                        }
                      }
                      return message
                    }
                  )
                }
                return {
                  ...page,
                  messages: updatedMessages,
                }
              }
              return page
            })

						return {
							...old,
							pages: updatedPages
						}
					}
				)
			}
		},

		onError: (_, __, ctx) => {
			setMessage(backupMsg.current)

			utils.getFileMessages.setData(
				{fileId},
				{messages: ctx?.previousMessages ?? []}
			)
		},

		onSettled: async () => {
			setIsLoading(false)

			await utils.getFileMessages.invalidate({fileId})
		}
	})

	const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)

	const addMessage = () => sendMessage({message})

	return (
		<ChatContext.Provider value={{
			addMessage,
			message,
			handleInputChange,
			isLoading
		}}>
			{children}
		</ChatContext.Provider>
	)
}
